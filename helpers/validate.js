module.exports = (fields = {}, validations = {}) => {
    let errors = {};

    Object.entries(validations).map(([key, rules]) => {
        let field = fields[key];
        if (validations[key].required && field === '') {
            errors[key] = `${key} is required`;
            return;
        }

        if (field === undefined || null) {
            return;
        }

        Object.entries(rules).map(([rule, value], index) => {
            switch (rule) {
                case 'min':
                    if (field.length < value && !errors[key]) {
                        errors[
                            key
                        ] = `${key} must have a minimum of ${value} characters`;
                    }
                    break;
                case 'max':
                    if (field.length > value && !errors[key]) {
                        errors[
                            key
                        ] = `${key} must have a maximum of ${value} characters`;
                    }
                    break;
                case 'matches':
                    if (field !== value && !errors[key]) {
                        errors[key] = `${key} does not match`;
                    }
                    break;
            }
        });
    });

    return errors;
};
