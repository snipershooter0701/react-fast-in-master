const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const RecipeTypes = require('../models/recipeType');

const Logs = require('../models/adminLogs');
const { ADD, MODIFY, DELETE } = require('../config/constants');

const admin = require('../middlewares/admin');
const recipeTypeValidation = require('../middlewares/validations/recipeTypeValidation');

router.use(cors());

// @route 	POST /api/recipes/type
// @desc 	Create recipe type
// @access 	Private
router.post('/', [admin, recipeTypeValidation], async (req, res) => {
    try {
        const recipe_type = req.body.recipe_type.toString().toLowerCase();

        let recipeType = await RecipeTypes.findOne({ recipe_type });

        if (recipeType) {
            return res.status(400).json({
                success: false,
                message: `Recipe type ${recipe_type} already exists`,
            });
        }

        recipeType = await RecipeTypes.create({ recipe_type });

        const log = {
            user: req.user.username,
            type: ADD,
            action: `Created a new recipe type (${recipeType.recipe_type})`,
        };

        await Logs.create(log);

        res.status(201).json({ success: true, data: recipeType });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/recipes/type
// @desc 	Get all recipe types
// @access 	Public
router.get('/', async (req, res) => {
    try {
        const data = await RecipeTypes.find({});
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No ingredient categories in database',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/recipes/type/:id
// @desc 	Get recipe type by id
// @access 	Public
router.get('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        const data = await RecipeTypes.findOne({ _id });
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No matching recipe type',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/recipes/type/:id
// @desc 	Update recipe type
// @access 	Private
router.put('/:id', [admin, recipeTypeValidation], async (req, res) => {
    try {
        const { id: _id } = req.params;
        const recipe_type = req.body.recipe_type.toString().toLowerCase();

        let recipeType = await RecipeTypes.findById(_id);

        if (!recipeType) {
            return res.status(404).json({
                success: false,
                message: 'No matching recipe type',
            });
        }

        recipeType = await RecipeTypes.findByIdAndUpdate(
            _id,
            { recipe_type },
            { new: true }
        );

        const log = {
            user: req.user.username,
            type: MODIFY,
            action: `Modified a recipe type (${recipeType.recipe_type})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, data: recipeType });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	DELETE /api/recipes/type/:id
// @desc 	Delete recipe type
// @access 	Private
router.delete('/:id', [admin], async (req, res) => {
    try {
        const { id: _id } = req.params;

        let recipeType = await RecipeTypes.findById(_id);

        if (!recipeType) {
            return res.status(404).json({
                success: false,
                message: 'No matching recipe type',
            });
        }

        await RecipeTypes.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted a recipe type (${recipeType.recipe_type})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, message: 'Recipe type deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
