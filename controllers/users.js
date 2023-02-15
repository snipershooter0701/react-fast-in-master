const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/user');
const Profile = require('../models/profile');
const Recipe = require('../models/recipe');
const jwt = require('../middlewares/jwt');
const { isAdmin } = require('../helpers/roleTypes');
const { uploadS3, deleteS3Object } = require('../helpers/S3Multer');

router.use(cors());

router.get('/', async (req, res) => {
    const { page, limit } = req.query;

    const pageOptions = {
        page: +page - 1 || 0,
        limit: +limit || 10,
    };

    try {
        // prettier-ignore
        const users = await User.find({})
                                .skip(pageOptions.page * pageOptions.limit)
                                .limit(pageOptions.limit);

        const total = await User.countDocuments();

        res.status(200).json({
            success: true,
            data: { users, total },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/profile/:id', [jwt], async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (_id !== req.user._id && !isAdmin(req.user.type)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized request',
            });
        }

        const profile = await Profile.findOne({ user: _id });

        if (!profile) {
            return res.status(403).json({
                success: false,
                message: 'User does not have a profile',
            });
        }

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/profile/:id/savedRecipes', [jwt], async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (_id !== req.user._id && !isAdmin(req.user.type)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized request',
            });
        }

        const profile = await Profile.findOne({ user: _id });

        if (!profile) {
            return res.status(403).json({
                success: false,
                message: 'User does not have a profile',
            });
        }

        const { savedRecipes } = profile;

        // prettier-ignore
        const recipes = await Recipe.find({ _id: { $in: savedRecipes } })
                                    .populate('ingredients')
                                    .populate('category')
                                    .populate('recipe_type')
                                    .populate('cuisine')
                                    .exec();

        return res.status(200).json({
            success: true,
            data: recipes,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/profile/:id/customRecipes', [jwt], async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (_id !== req.user._id && !isAdmin(req.user.type)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized request',
            });
        }

        const profile = await Profile.findOne({ user: _id });

        if (!profile) {
            return res.status(403).json({
                success: false,
                message: 'User does not have a profile',
            });
        }

        // prettier-ignore
        const recipes = await Recipe.find({ author: req.user._id, public : false})
                                    .populate('ingredients')
                                    .populate('category')
                                    .populate('recipe_type')
                                    .populate('cuisine')
                                    .exec();

        return res.status(200).json({
            success: true,
            data: recipes,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/profile/:id/myRecipes', [jwt], async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (_id !== req.user._id && !isAdmin(req.user.type)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized request',
            });
        }

        const profile = await Profile.findOne({ user: _id });

        if (!profile) {
            return res.status(403).json({
                success: false,
                message: 'User does not have a profile',
            });
        }

        // prettier-ignore
        const recipes = await Recipe.find({ author: req.user._id, public : true})
                                    .populate('ingredients')
                                    .populate('category')
                                    .populate('recipe_type')
                                    .populate('cuisine')
                                    .exec();

        return res.status(200).json({
            success: true,
            data: recipes,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put(
    '/profile/:id',
    [jwt, uploadS3.single('uploaded')],
    async (req, res) => {
        const { id: _id } = req.params;

        try {
            if (_id !== req.user._id && !isAdmin(req.user.type)) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized request',
                });
            }

            let profile;

            try {
                profile = await Profile.find({ user: _id });

                if (!profile) {
                    return res.status(404).json({
                        success: false,
                        message: 'Profile does not exist',
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }

            profile = JSON.parse(JSON.stringify(req.body));
            profile = Object.entries(profile).reduce(
                (parsedProfile, [key, value]) => ({
                    ...parsedProfile,
                    [key]: JSON.parse(value),
                }),
                {}
            );

            const {
                allergies,
                diets,
                halal,
                image,
                savedRecipes,
                customRecipes,
            } = profile;

            const profileData = {
                allergies,
                diets,
                image,
                halal,
                savedRecipes,
                customRecipes,
            };

            const s3image = req.file;

            if (s3image) {
                if (image) {
                    deleteS3Object([{ Key: image.key }]);
                }

                profile = await Profile.findOneAndUpdate(
                    { user: _id },
                    {
                        ...profileData,
                        image: { key: s3image.key, location: s3image.location },
                    },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    data: profile,
                });
            }

            profile = await Profile.findOneAndUpdate(
                { user: _id },
                profileData,
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: profile,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

router.put(
    '/profile/:id',
    [jwt, uploadS3.single('uploaded')],
    async (req, res) => {
        const { id: _id } = req.params;

        try {
            if (_id !== req.user._id && !isAdmin(req.user.type)) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized request',
                });
            }

            let profile;

            try {
                profile = await Profile.find({ user: _id });

                if (!profile) {
                    return res.status(404).json({
                        success: false,
                        message: 'Profile does not exist',
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }

            try {
                profile = await Profile.findOneAndUpdate(
                    { user: _id },
                    profileData,
                    { new: true }
                );
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(200).json({ success: true, data: profile });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

module.exports = router;
