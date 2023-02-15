const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');
const Recipe = require('../models/recipe');
const Logs = require('../models/adminLogs');
const { uploadS3, deleteS3Object } = require('../helpers/S3Multer');
const jwt = require('../middlewares/jwt');
const recipeValidation = require('../middlewares/validations/recipeValidation');
const { ADD, MODIFY, DELETE } = require('../config/constants');

router.use(cors());

// @route 	POST /api/recipes
// @desc 	Create recipe
// @access 	Private
router.post(
    '/',
    [jwt, recipeValidation, uploadS3.array('uploaded')],
    async (req, res) => {
        try {
            let recipe = JSON.parse(JSON.stringify(req.body));
            recipe = Object.entries(recipe).reduce(
                (parsedRecipe, [key, value]) => ({
                    ...parsedRecipe,
                    [key]: JSON.parse(value),
                }),
                {}
            );
            const {
                recipe_name,
                description,
                images,
                ingredients,
                halal,
                directions,
                cuisine,
                recipe_type,
                category,
                duration,
                servings,
                difficulty,
                public,
            } = recipe;

            const s3images = req.files;

            const formattedImages = s3images.map(({ key, location }) => ({
                key,
                location,
            }));

            const recipeData = {
                recipe_name,
                description,
                images: [...images, ...formattedImages],
                ingredients: ingredients.map(({ _id }) => _id),
                halal,
                directions,
                cuisine: cuisine._id,
                recipe_type: recipe_type._id,
                category: category._id,
                duration,
                servings,
                difficulty,
                public,
                author: req.user._id,
            };

            const newRecipe = await Recipe.create(recipeData);

            const log = {
                user: req.user.username,
                type: ADD,
                action: `Created a new recipe (${newRecipe.recipe_name})`,
            };

            await Logs.create(log);

            // prettier-ignore
            recipe = await Recipe.findOne({ _id: newRecipe._id })
                                .populate('ingredients')
                                .populate('category')
                                .populate('recipe_type')
                                .populate('cuisine')
                                .exec();

            res.status(201).json({ success: true, data: recipe });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

// @route 	GET /api/recipes
// @desc 	Get all recipes
// @access 	Public
router.get('/', async (req, res) => {
    const { page, limit } = req.query;

    const pageOptions = {
        page: +page - 1 || 0,
        limit: +limit || 10,
    };

    try {
        let recipes;
        if (page && limit) {
            // prettier-ignore
            recipes = await Recipe.find({ public : true})
                                    .skip(pageOptions.page * pageOptions.limit)
                                    .limit(pageOptions.limit)
                                    .populate('ingredients')
                                    .populate('category')
                                    .populate('recipe_type')
                                    .populate('cuisine')
                                    .exec();
        } else {
            // prettier-ignore
            recipes = await Recipe.find({ public : true})
                                    .populate('ingredients')
                                    .populate('category')
                                    .populate('recipe_type')
                                    .populate('cuisine')
                                    .exec();
        }

        const total = await Recipe.countDocuments({ public: true });

        res.status(200).json({
            success: true,
            data: { recipes, total },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/recipes/:id
// @desc 	Get recipes by id
// @access 	Public
router.get('/:id', async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        // prettier-ignore
        const recipe = await Recipe.findOne({_id})
									.populate('ingredients')
									.populate('category')
									.populate('recipe_type')
									.populate('cuisine')
									.exec();

        recipe
            ? res.status(200).json({ success: true, data: recipe })
            : res.status(404).json({
                  success: false,
                  message: 'No matching recipe',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/recipes/top-rated
// @desc    Get top rated recipes by reviews
// @access  Public
router.get('/top-rated', async (req, res) => {
    const { limit } = req.query;
    try {
        // prettier-ignore
        const recipe = await Recipe.find({ public: true })
                                    .sort({ rating: -1 })
                                    .limit(+limit || 3)
                                    .populate('ingredients')
                                    .populate('category')
                                    .populate('recipe_type')
                                    .populate('cuisine')
                                    .exec();

        res.status(200).json({
            success: true,
            data: recipe,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/recipes/:id
// @desc 	Update recipe
// @access 	Private
router.put(
    '/:id',
    [jwt, recipeValidation, uploadS3.array('uploaded')],
    async (req, res) => {
        try {
            const { id: _id } = req.params;

            let recipe = JSON.parse(JSON.stringify(req.body));
            recipe = Object.entries(recipe).reduce(
                (parsedRecipe, [key, value]) => {
                    return { ...parsedRecipe, [key]: JSON.parse(value) };
                },
                {}
            );

            const s3images = req.files;

            const newImages = s3images.map(({ key, location }) => ({
                key,
                location,
            }));

            const {
                recipe_name,
                images,
                description,
                ingredients,
                halal,
                directions,
                cuisine,
                recipe_type,
                category,
                duration,
                servings,
                difficulty,
                removedImages,
                public,
            } = recipe;

            recipe = await Recipe.findById(_id);

            if (!recipe) {
                res.status(404).json({
                    success: false,
                    message: 'No matching recipe',
                });
            }

            if (removedImages && removedImages.length) {
                const toDelete = [];
                await Promise.all(
                    removedImages.map(async (image) => {
                        const inUse = await Recipe.find({
                            'images.key': image.key,
                            _id: { $ne: _id },
                        });
                        if (!inUse) {
                            toDelete.push(image);
                        }
                    })
                );
                if (toDelete.length) {
                    deleteS3Object(toDelete.map(({ key }) => ({ Key: key })));
                }
            }

            const recipeData = {
                recipe_name,
                images: [...images, ...newImages],
                description,
                ingredients: ingredients.map(({ _id }) => _id),
                halal,
                directions,
                cuisine: cuisine._id,
                recipe_type: recipe_type._id,
                category: category._id,
                duration,
                servings,
                difficulty,
                public,
            };

            recipe = await Recipe.findByIdAndUpdate(_id, recipeData);

            const log = {
                user: req.user.username,
                type: MODIFY,
                action: `Modified a recipe (${recipe.recipe_name})`,
            };

            await Logs.create(log);

            // prettier-ignore
            recipe = await Recipe.findOne({ _id })
                                .populate('ingredients')
                                .populate('category')
                                .populate('recipe_type')
                                .populate('cuisine')
                                .exec();

            res.status(200).json({ success: true, data: recipe });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

// @route   PUT     /api/recipes/:id/view
// @desc    Update recipe view count
// @access  Public
router.put('/:id/view', async (req, res) => {
    try {
        const { id: _id } = req.params;

        let recipe = await Recipe.findById(_id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'No matching recipe',
            });
        }

        const { views } = recipe;

        await Recipe.findByIdAndUpdate(_id, { views: views + 1 });

        recipe = await Recipe.findOne({ _id })
            .populate('ingredients')
            .populate('category')
            .populate('recipe_type')
            .populate('cuisine')
            .exec();

        res.status(200).json({ success: true, data: recipe });
    } catch (error) {
        console.log(error);
    }
});

// @route 	DELETE /api/recipes/:id
// @desc 	Delete recipe
// @access 	Private
router.delete('/:id', [jwt], async (req, res) => {
    try {
        const { id: _id } = req.params;

        let recipe = await Recipe.findById(_id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'No matching recipe',
            });
        }

        const { recipe_name, images } = recipe;

        if (images && images.length) {
            const toDelete = [];
            await Promise.all(
                images.map(async (image) => {
                    const inUse = await Recipe.find({
                        'images.key': image.key,
                        _id: { $ne: _id },
                    });
                    if (!inUse) {
                        toDelete.push(image);
                    }
                })
            );
            if (toDelete.length) {
                deleteS3Object(toDelete.map(({ key }) => ({ Key: key })));
            }
        }

        await Recipe.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted a recipe (${recipe_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, message: 'Recipe deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
