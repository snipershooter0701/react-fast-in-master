const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Allergy = require('../models/allergy');

const Logs = require('../models/adminLogs');
const { ADD, MODIFY, DELETE } = require('../config/constants');

const admin = require('../middlewares/admin');
const allergyValidation = require('../middlewares/validations/allergyValidation');
const { uploadS3, deleteS3Object } = require('../helpers/S3Multer');

router.use(cors());

// @route 	POST /api/ingredients/allergies
// @desc 	Create new allergy
// @access 	Private
router.post(
    '/',
    [admin, allergyValidation, uploadS3.single('uploaded')],
    async (req, res) => {
        try {
            let allergy = JSON.parse(JSON.stringify(req.body));

            let { name } = allergy;

            // name = JSON.parse(name).toLowerCase();

            allergy = await Allergy.findOne({
                name,
            });

            if (allergy) {
                return res.status(400).json({
                    success: false,
                    message: `Allergy ${name} already exists`,
                });
            }

            const s3image = req.file;

            if (!s3image) {
                return res.status(404).json({
                    success: false,
                    message: `Image not found`,
                });
            }

            allergy = await Allergy.create({
                name: JSON.parse(name),
                image: {
                    key: s3image.key,
                    location: s3image.location,
                },
            });

            const log = {
                user: req.user.username,
                type: ADD,
                action: `Created a new allergy type (${allergy.name})`,
            };

            await Logs.create(log);

            res.status(201).json({ success: true, data: allergy });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

// @route 	GET /api/ingredients/allergies
// @desc 	Get all  allergies
// @access 	Public
router.get('/', async (req, res) => {
    try {
        const data = await Allergy.find({});
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No allergies in database',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	GET /api/ingredients/allergies/:id
// @desc 	Get allergy by id
// @access 	Public
router.get('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.isValidObjectId(_id)) return next();
        const data = await Allergy.findOne({ _id });
        data
            ? res.status(200).json({ success: true, data })
            : res.status(404).json({
                  success: false,
                  message: 'No matching allergy',
              });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route 	PUT /api/ingredients/allergies/:id
// @desc 	Update alergy
// @access 	Private
router.put(
    '/:id',
    [admin, allergyValidation, uploadS3.single('uploaded')],
    async (req, res) => {
        const { id: _id } = req.params;
        try {
            let allergy = JSON.parse(JSON.stringify(req.body));

            let { name, image } = allergy;

            let allergies = await Allergy.findById(_id);

            if (!allergies) {
                return res.status(404).json({
                    success: false,
                    message: 'No matching allergy',
                });
            }

            const s3image = req.file;

            if (s3image) {
                if (image) {
                    deleteS3Object([{ Key: JSON.parse(image).key }]);
                }
                allergies = await Allergy.findByIdAndUpdate(
                    _id,
                    {
                        name: JSON.parse(name),
                        image: { key: s3image.key, location: s3image.location },
                    },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    data: allergies,
                });
            }

            allergies = await Allergy.findByIdAndUpdate(
                _id,
                { name: JSON.parse(name) },
                { new: true }
            );

            const log = {
                user: req.user.username,
                type: MODIFY,
                action: `Modified an allergy (${allergies.name})`,
            };

            await Logs.create(log);

            res.status(200).json({
                success: true,
                data: allergies,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

// @route 	DELETE /api/ingredients/allergies/:id
// @desc 	Delete allergy
// @access 	Private
router.delete('/:id', [admin], async (req, res) => {
    try {
        const { id: _id } = req.params;
        let allergies = await Allergy.findById(_id);

        if (!allergies) {
            return res.status(404).json({
                success: false,
                message: 'No matching allergy',
            });
        }

        deleteS3Object([{ Key: allergies.image.key }]);

        await Allergy.findByIdAndDelete(_id);

        const log = {
            user: req.user.username,
            type: DELETE,
            action: `Deleted an allergy (${allergies.name})`,
        };

        await Logs.create(log);

        res.status(200).json({
            success: true,
            message: 'Allergy deleted',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
