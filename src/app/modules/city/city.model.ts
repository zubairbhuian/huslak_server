const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
        trim: true, // empty space remove
        maxlength: [200, 'Name should be under 200 characters'],
        unique: true
    },
    countryId: {
        type: String,
        required: [true, 'Country is missing'],
        trim: true, // empty space remove
        maxlength: [100, 'Country should be under 31 characters'],
    },
    temperature: {
        type: String,
        required: [true, 'Temperature is missing'],
        trim: true,
        maxlength: [3, 'Temperature should be under 3 characters'],
    },
    img: {
        type: String,
        default: ''
    },
}, {
    timestamps: true // when this data is created or updated
});

export const CityModel = mongoose.model('City', citySchema);