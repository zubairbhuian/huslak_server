const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
        trim: true, // empty space remove
        maxlength: [150, 'Name should be under 150 characters'],
    },
    img: {
        type: String,
        default: ''
    },
}, {
    timestamps: true // when this data is created or updated
});

export const CountryModel = mongoose.model('country', countrySchema);