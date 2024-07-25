import mongoose, { Document, Schema } from 'mongoose';

type ICarRental = {
  make: string;
  model: string;
  year: number;
  seats: number;
  bags: number;
  pricePerDay: number;
  img: string;
  location: string;
  phone: string;
} & Document

const CarRentalSchema: Schema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  seats: { type: Number, required: true },
  bags: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  img: { type: String, required: true },
});

const CarRentalModel = mongoose.model<ICarRental>('CarRental', CarRentalSchema);

export default CarRentalModel;
