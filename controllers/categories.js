const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Category = require('../models/category');
const admin = require('../middlewares/admin');

const Logs = require('../models/adminLogs');
const { ADD, MODIFY, DELETE } = require('../config/constants');

const categoryValidation = require('../middlewares/validations/categoryValidation');

router.use(cors());

// @route	POST /api/recipes/categories
// @desc 	Create recipe category
// @access 	Private
router.post('/', [admin, categoryValidation], async (req, res) => {
    try {
        const category_name = req.body.category_name.toString().toLowerCase();
        const category = await Category.findOne({ category_name });

        if (category) {
            return res.status(400).json({
                success: false,
                message: `Category ${category_name} already exists`,
            });
        }

        const categoryName = await Category.create({ category_name });

        const log = {
            user: req.user.username,
            type: ADD,
            action: `Created a new recipe category (${categoryName.category_name})`,
        };

        await Logs.create(log);

        res.status(201).json({ success: true, data: categoryName });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/recipes/categories
// @desc 	Get all recipe categories
// @access	Public
router.get('/', async (req, res) => {
    try {
        const data = await Category.find({});
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No categories in database',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/recipes/categories/:id
// @desc 	Get a recipe category
// @access 	Public
router.get('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        const data = await Category.findOne({ _id });
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No matching categories',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/recipes/categories/:id
// @desc 	Update category name
// @access 	Private
router.put('/:id', [admin, categoryValidation], async (req, res) => {
    try {
        const { id: _id } = req.params;
        const category_name = req.body.category_name.toString().toLowerCase();

        let categories = await Category.findById(_id);
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: 'No matching category',
            });
        }

        categories = await Category.findByIdAndUpdate(
            _id,
            { category_name },
            { new: true }
        );

        const log = {
            user: req.user.username,
            type: MODIFY,
            action: `Modified a recipe category (${categories.category_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	DELETE /api/recipes/categories/:id
// @desc 	Delete category
// @access 	Private
router.delete('/:id', [admin], async (req, res) => {
    try {
        const { id: _id } = req.params;

        let categories = await Category.findById(_id);

        if (!categories) {
            return res.status(404).json({
                success: false,
                message: 'No matching category',
            });
        }

        await Category.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted a recipe category (${categories.category_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
