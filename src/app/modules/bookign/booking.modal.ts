import mongoose, { Document, Schema } from 'mongoose';

type IBooking = {
  userId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  availabilityId: mongoose.Types.ObjectId;
  date: Date;
  status: string;
} & Document

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'huslak-app-users',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'huslak-app-users',
    required: true
  },
  availabilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Availability',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema);
