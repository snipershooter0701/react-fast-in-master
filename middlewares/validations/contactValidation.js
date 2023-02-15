const validate = require('../../helpers/validate');

module.exports = (req, res, next) => {
    try {
        validations = {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            email: {
                required: true,
            },
            message: {
                required: true,
            },
        };

        let errors = validate(req.body, validations);

        Object.entries(errors).length
            ? res.status(400).json({ success: false, errors })
            : next();
    } catch (err) {
        res.status(500).json({ success: false, message: error.message });
    }
};
