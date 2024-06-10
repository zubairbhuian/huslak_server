const mongoose = require('mongoose');
const { Schema } = mongoose;

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
        trim: true, // empty space remove
        maxlength: [50, 'Name should be under 31 characters'],
    },
    address: {
        type: String,
        required: [true, 'Address is missing'],
        trim: true,
    },
    cityId: {
        type: String,
        required: [true, 'cityId is missing'],
        trim: true,
        maxlength: [50, 'cityId should be under 50 characters'],
    },
    img: {
        type: String,
        default: ''
    },
}, {
    timestamps: true // when this data is created or updated
});

export const HospitalModel = mongoose.model('hospital', hospitalSchema);