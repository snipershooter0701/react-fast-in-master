const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const IngredientCategory = require('../models/ingredient_category');

const Logs = require('../models/adminLogs');
const { ADD, MODIFY, DELETE } = require('../config/constants');

const admin = require('../middlewares/admin');
const ingredientCategoryValidation = require('../middlewares/validations/ingredientCategoryValidation');

router.use(cors());

// @route 	POST /api/ingredients/categories
// @desc 	Create new ingredient category
// @access 	Private
router.post('/', [admin, ingredientCategoryValidation], async (req, res) => {
    try {
        const name = req.body.name;
        const category = await IngredientCategory.findOne({
            name,
        });

        if (category) {
            return res.status(400).json({
                success: false,
                message: `Ingredient Category ${name} already exists`,
            });
        }

        const ingredientCategory = await IngredientCategory.create({
            name,
        });

        const log = {
            user: req.user.username,
            type: ADD,
            action: `Created a new ingredient category (${ingredientCategory.name})`,
        };

        await Logs.create(log);

        res.status(201).json({ success: true, data: ingredientCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/ingredients/categories
// @desc 	Get all ingredient categories
// @access 	Public
router.get('/', async (req, res) => {
    try {
        const data = await IngredientCategory.find({});
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

// @route 	GET /api/ingredients/categories/:id
// @desc 	Get ingredient category by id
// @access 	Public
router.get('/:id', async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        const data = await IngredientCategory.findOne({ _id });
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No matching ingredient category',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/ingredients/categories/:id
// @desc 	Update ingredient category
// @access 	Private
router.put('/:id', [admin, ingredientCategoryValidation], async (req, res) => {
    try {
        const { id: _id } = req.params;
        const name = req.body.name.toString().toLowerCase();

        let ingredientCategories = await IngredientCategory.findById(_id);

        if (!ingredientCategories) {
            return res.status(404).json({
                success: false,
                message: 'No matching ingredient category',
            });
        }

        ingredientCategories = await IngredientCategory.findByIdAndUpdate(
            _id,
            { name },
            { new: true }
        );

        const log = {
            user: req.user.username,
            type: MODIFY,
            action: `Modified an ingredient category (${ingredientCategories.name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, data: ingredientCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	DELETE /api/ingredients/categories/:id
// @desc 	Delete ingredient category
// @access 	Private
router.delete('/:id', [admin], async (req, res) => {
    try {
        const { id: _id } = req.params;

        let ingredientCategories = await IngredientCategory.findById(_id);

        if (!ingredientCategories) {
            return res.status(404).json({
                success: false,
                message: 'No matching ingredient category',
            });
        }

        await IngredientCategory.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted an allergy (${ingredientCategories.name})`,
        };

        await Logs.create(log);

        res.status(200).json({
            success: true,
            message: 'Ingredient category deleted',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
