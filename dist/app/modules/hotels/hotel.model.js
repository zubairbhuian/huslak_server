"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModel = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const hotelSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
        trim: true, // empty space remove
        maxlength: [150, 'Name should be under 150 characters'],
    },
    address: {
        type: String,
        required: [true, 'Address is missing'],
        trim: true,
    },
    price: {
        type: String,
        required: [true, 'Price is missing'],
        trim: true,
    },
    goOn: {
        type: String,
        required: [true, 'Go-on is missing'],
        trim: true,
    },
    cityId: {
        type: String,
        required: [true, 'cityId is missing'],
        trim: true,
    },
    nearHospital: {
        type: String,
        required: [true, 'Near hospital is missing'],
        trim: true,
    },
    img: {
        type: String,
        default: ''
    },
}, {
    timestamps: true // when this data is created or updated
});
exports.HotelModel = mongoose.model('hotel', hotelSchema);
//# sourceMappingURL=hotel.model.js.map