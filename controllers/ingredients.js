const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Ingredient = require('../models/ingredient');
const Logs = require('../models/adminLogs');
const { ADD, MODIFY, DELETE } = require('../config/constants');

const admin = require('../middlewares/admin');
const ingredientValidation = require('../middlewares/validations/ingredientValidation');

router.use(cors());

// @route 	POST /api/ingredients
// @desc 	Create new ingredient
// @access 	Private
router.post('/', [admin, ingredientValidation], async (req, res) => {
    try {
        // prettier-ignore
        const { 
			ingredient_name,
			ingredient_category,
			allergy,
			image
		} = req.body;

        const ingredientName = ingredient_name.toLowerCase();

        let ingredient = await Ingredient.findOne({
            ingredient_name: ingredientName,
        });
        if (ingredient) {
            return res.status(400).json({
                success: false,
                message: `Ingredient ${ingredient_name} already exists`,
            });
        }

        const newIngredient = {
            ingredient_name: ingredientName,
            ingredient_category,
            allergy,
            image,
        };

        ingredient = await Ingredient.create(newIngredient);

        const log = {
            user: req.user.username,
            type: ADD,
            action: `Created a new ingredient (${ingredient.ingredient_name})`,
        };

        await Logs.create(log);

        // prettier-ignore
        ingredient = await Ingredient.findOne({ _id: ingredient._id })
                                    .populate('ingredient_category')
                                    .populate('allergy')
                                    .exec();

        res.status(201).json({ success: true, data: ingredient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/ingredients
// @desc 	Get all ingredients
// @access 	Public
router.get('/', async (req, res) => {
    const { page, limit } = req.query;

    const pageOptions = {
        page: +page - 1 || 0,
        limit: +limit || 10,
    };

    try {
        let ingredients;
        if (page && limit) {
            // prettier-ignore
            ingredients = await Ingredient.find({})
                                        .skip(pageOptions.page * pageOptions.limit)
                                        .limit(pageOptions.limit)
                                        .populate('ingredient_category')
                                        .populate('allergy')
                                        .exec();
        } else {
            // prettier-ignore
            ingredients = await Ingredient.find({})
                                        .populate('ingredient_category')
                                        .populate('allergy')
                                        .exec();
        }

        const total = await Ingredient.countDocuments();

        res.status(200).json({
            success: true,
            data: { ingredients, total },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/ingredients/:id
// @desc 	Get ingredient by id
// @access 	Public
router.get('/:id', async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        // prettier-ignore
        const ingredient = await Ingredient.findOne({ _id })
											.populate('ingredient_category')
											.populate('allergy')
											.exec();
        ingredient
            ? res.status(200).json({ success: true, data: ingredient })
            : res.status(403).json({
                  success: false,
                  message: 'No matching ingredient',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/ingredients/:id
// @desc 	Update ingredient
// @access 	Private
router.put('/:id', [admin, ingredientValidation], async (req, res) => {
    try {
        const { id: _id } = req.params;
        // prettier-ignore
        const { ingredient_name, ingredient_category, allergy, image } = req.body;

        const ingredientName = ingredient_name.toLowerCase();

        let ingredient = await Ingredient.findById(_id);

        if (!ingredient) {
            return res.status(404).json({
                success: false,
                message: 'No matching ingredient',
            });
        }

        const newIngredient = {
            ingredient_name: ingredientName,
            ingredient_category,
            allergy,
            image,
        };

        await Ingredient.findByIdAndUpdate(_id, newIngredient);

        // prettier-ignore
        ingredient = await Ingredient.findById(_id)
                                    .populate('ingredient_category')
                                    .populate('allergy')
                                    .exec();

        const log = {
            user: req.user.username,
            type: MODIFY,
            action: `Modified a ingredient (${ingredient.ingredient_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, data: ingredient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route	/api/ingredients/delete
// @desc 	Delete ingredient
// @access	Private
router.delete('/:id', [admin], async (req, res) => {
    try {
        const { id: _id } = req.params;

        let ingredient = await Ingredient.findById(_id);

        if (!ingredient) {
            return res.status(404).json({
                success: false,
                message: 'No matching ingredient',
            });
        }

        await Ingredient.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted a ingredient (${ingredient.ingredient_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, message: 'Ingredient deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	/api/ingredients/search
// @desc 	Search ingredients by keyword and order by most relevant
// @access	Public
router.get('/search', async (req, res) => {
    try {
        const { s: keyword } = req.query;

        //Returns array of results with ingredients that matches and begin with keyword.
        const sortByKeyword = await Ingredient.find({
            ingredient_name: { $regex: `^${keyword}.*` },
        }).sort({
            ingredient_name: 1,
        });

        const sortByRemaining = await Ingredient.find({
            ingredient_name: {
                $regex: `.*${keyword}.*`,
                $not: { $regex: `^${keyword}.*` },
            },
        }).sort({
            ingredient_name: 1,
        });

        const ingredients = [...sortByKeyword, ...sortByRemaining];

        ingredients.length
            ? res.status(200).json({ success: true, data: ingredients })
            : res.status(403).json({
                  success: false,
                  message: 'No matching ingredients found',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.mesasge });
    }
});

module.exports = router;
