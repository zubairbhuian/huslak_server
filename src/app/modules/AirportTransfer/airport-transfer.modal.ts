import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Airport Transfer document
type IAirportTransfer = {
  make: string;
  model: string;
  year: number;
  driverName: string;
  description: string;
  img: string;
  phone: string;
  rate: number;
  location: string;
} & Document

// Define the schema
const AirportTransferSchema: Schema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  driverName: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  img: { type: String, default: '' },
  rate: { type: Number, required: true },
  location: { type: String, required: true },
  cityId: {
    type: String,
    trim: true,
    required: [true, 'City is missing'],
  },
  nearHospitalId: {
    type: String,
    trim: true,
    required: [true, 'Near Hospital is missing'],
  },
}, {
  timestamps: true
});

// Create the model
const AirportTransferModel = mongoose.model<IAirportTransfer>('AirportTransfer', AirportTransferSchema);

export default AirportTransferModel;
