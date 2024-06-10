"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const restaurantSchema = new Schema({
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
    distance: {
        type: String,
        required: [true, 'Distance is missing'],
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
    nearHospitalId: {
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
exports.RestaurantModel = mongoose.model('restaurant', restaurantSchema);
//# sourceMappingURL=restaurant.model.js.map