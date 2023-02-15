const validate = require('../../helpers/validate');

module.exports = (req, res, next) => {
    try {
        validations = {
            recipe_name: {
                required: true,
            },
            description: {
                required: true,
            },
            images: {
                required: true,
            },
            ingredients: {
                required: true,
            },
            halal: {
                required: true,
            },
            directions: {
                required: true,
            },
            cuisine: {
                required: true,
            },
            recipe_type: {
                required: true,
            },
            category: {
                required: true,
            },
            rating: {
                min: 0,
                max: 5,
            },
            views: {
                min: 0,
            },
            duration: {
                min: 0,
                required: true,
            },
            servings: {
                min: 0,
                required: true,
            },
            difficulty: {
                required: true,
            },
        };

        let errors = validate(req.body, validations);

        Object.entries(errors).length
            ? res.status(400).json({ success: false, errors })
            : next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
