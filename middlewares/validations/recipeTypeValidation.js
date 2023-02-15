const validate = require('../../helpers/validate');

module.exports = (req, res, next) => {
	try {
		validations = {
			recipe_type: {
				required: true,
			},
		};

		let errors = validate(req.body, validations);

		Object.entries(errors).length ? res.status(400).json({ success: false, errors }) : next();
	} catch (err) {
		res.status(500).json({ success: false, message: error.message });
	}
};
