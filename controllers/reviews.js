const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');

const Reviews = require('../models/reviews');
const Recipe = require('../models/recipe');

const reviewsValidation = require('../middlewares/validations/reviewsValidation');
const jwt = require('../middlewares/jwt');

router.use(cors());

router.post(`/:id`, [jwt, reviewsValidation], async (req, res) => {
    const { id: _id } = req.params;
    try {
        const { rating, comment } = req.body;

        const reviewData = {
            user: req.user._id,
            rating,
            comment,
            recipe: _id,
        };

        let review = await Reviews.create(reviewData);

        const allReviews = await Reviews.find({ recipe: _id });

        const totalRatings = allReviews.reduce(
            (rating, review) => rating + review.rating,
            0
        );

        const totalReviews = await Reviews.countDocuments({ recipe: _id });

        await Recipe.findByIdAndUpdate(_id, {
            rating: (totalRatings / totalReviews).toFixed(2),
        });

        review = await Reviews.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(review._id),
                },
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'user',
                    foreignField: 'user',
                    as: 'profile',
                },
            },
            {
                $unwind: '$profile',
            },
        ]);

        res.status(201).json({ success: true, data: review[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id: _id } = req.params;
    try {
        let reviews = await Reviews.aggregate([
            {
                $match: {
                    recipe: mongoose.Types.ObjectId(_id),
                },
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'user',
                    foreignField: 'user',
                    as: 'profile',
                },
            },
            {
                $unwind: '$profile',
            },
        ]);

        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
