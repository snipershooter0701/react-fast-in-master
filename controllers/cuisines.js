const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Cuisine = require('../models/cuisine');

const Logs = require('../models/adminLogs');
const { ADD, MODIFY, DELETE } = require('../config/constants');

const admin = require('../middlewares/admin');
const cuisineValidation = require('../middlewares/validations/cuisineValidation');

router.use(cors());

// @route 	POST /api/recipes/cuisines
// @desc 	Create new cuisine
// @access 	Private
router.post('/', [admin, cuisineValidation], async (req, res) => {
    try {
        const cuisine_name = req.body.cuisine_name.toString().toLowerCase();
        const cuisine = await Cuisine.findOne({ cuisine_name });

        if (cuisine) {
            return res.status(400).json({
                success: false,
                message: `Cuisine ${cuisine_name} already exists`,
            });
        }

        const cuisineName = await Cuisine.create({ cuisine_name });

        const log = {
            user: req.user.username,
            type: ADD,
            action: `Created a new cuisine (${cuisineName.cuisine_name})`,
        };

        await Logs.create(log);

        res.status(201).json({ success: true, data: cuisineName });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/recipes/cuisines
// @desc 	Get all recipe cuisines
// @access 	Public
router.get('/', async (req, res) => {
    try {
        const data = await Cuisine.find({});
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No cuisines in database',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	Get /api/recipes/cuisines/:id
// @desc 	Get cuisine by ID
// @access 	Public
router.get('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        const data = await Cuisine.findOne({ _id });
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No matching cuisine',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/recipes/cuisines/:id
// @desc 	Update cuisine
// @access 	Private
router.put('/:id', [admin, cuisineValidation], async (req, res) => {
    try {
        const { id: _id } = req.params;
        const cuisine_name = req.body.cuisine_name.toString().toLowerCase();

        let cuisine = await Cuisine.findById(_id);

        if (!cuisine) {
            return res.status(404).json({
                success: false,
                message: 'No matching cuisine',
            });
        }

        cuisine = await Cuisine.findByIdAndUpdate(
            _id,
            { cuisine_name },
            { new: true }
        );

        const log = {
            user: req.user.username,
            type: MODIFY,
            action: `Modified a cuisine (${cuisine.cuisine_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, data: cuisine });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	DELETE /api/recipes/cuisines/:id
// @desc 	Delete cuisine
// @access 	Private
router.delete('/:id', [admin], async (req, res) => {
    try {
        const { id: _id } = req.params;

        let cuisine = await Cuisine.findById(_id);
        if (!cuisine) {
            return res.status(404).json({
                success: false,
                message: 'No matching cuisine',
            });
        }

        await Cuisine.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted a cuisine (${cuisine.cuisine_name})`,
        };

        await Logs.create(log);

        res.status(200).json({ success: true, message: 'Cuisine deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
