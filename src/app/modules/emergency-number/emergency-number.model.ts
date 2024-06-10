const mongoose = require('mongoose');
const { Schema } = mongoose;

const emergencyNumberSchema = new Schema({
    number: {
        type: String,
        required: [true, 'Name is missing'],
        trim: true, // empty space remove
        maxlength: [150, 'Name should be under 150 characters'],
        unique: true
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
    },
    nearHospitalId: {
        type: String,
        required: [true, 'Near hospital is missing'],
        trim: true,
    },
}, {
    timestamps: true // when this data is created or updated
});

export const EmergencyNumberModel = mongoose.model('emergency-number', emergencyNumberSchema);