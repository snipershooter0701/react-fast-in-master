const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Contact = require('../models/contact');

const admin = require('../middlewares/admin');
const contactValidation = require('../middlewares/validations/contactValidation');

router.use(cors());

router.post('/', [contactValidation], async (req, res) => {
    try {
        const { first_name, last_name, email, message } = req.body;

        const contactData = {
            first_name,
            last_name,
            email,
            message,
        };

        await Contact.create(contactData);

        res.status(200).json({
            success: true,
            message: 'Your message has been submitted',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/', [admin], async (req, res) => {
    try {
        const contacts = await Contact.find({});

        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', [admin], async (req, res) => {
    const { id: _id } = req.params;

    try {
        const contact = await Contact.findById(_id);

        res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
