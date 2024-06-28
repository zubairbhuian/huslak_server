import mongoose, { Document, Schema } from 'mongoose';

type IAvailability = {
  userId: mongoose.Types.ObjectId;
  dayName: string;
  availableTime: string[];
  isAvailable: boolean;
} & Document

const availabilitySchema = new Schema<IAvailability>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'huslak-app-users',
    required: true,
  },
  dayName: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  availableTime: {
    type: [String],
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const AvailabilityModel = mongoose.models.Availability || mongoose.model<IAvailability>('Availability', availabilitySchema);

export { AvailabilityModel, IAvailability };
