const mongoose = require('mongoose');
const { Schema } = mongoose;

const AllergySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
        required: true,
    },
});

module.exports = Allergy = mongoose.model('allergies', AllergySchema);
