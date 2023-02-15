const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Logs = require('../models/adminLogs');

const admin = require('../middlewares/admin');

router.use(cors());

// @route   GET /api/logs
// @desc    Get all system logs
// @access  Private
router.get('/', [admin], async (req, res) => {
    try {
        const logs = await Logs.find({});

        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
