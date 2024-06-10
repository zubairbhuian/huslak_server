import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface ILanguage {
  _id: string;
  name: string;
  img: string;
}

interface IDoctorSpecialist {
  _id: string;
  name: string;
}

interface IAvailability {
  dayName: string;
  availableTime: string;
  isAvailable: boolean;
}

interface IUser extends Document {
  email: string;
  name: string;
  phone: string;
  password: string;
  address: string;
  userType: string;
  isBlock: boolean;
  isAdmin: boolean;
  img: string;
  price: string;
  discretion: string;
  cityId: string;
  nearHospitalId: string;
  languages: ILanguage[];
  doctorSpecialist: IDoctorSpecialist[];
  availability: IAvailability[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const languageSchema = new Schema<ILanguage>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true }
});

const doctorSpecialistSchema = new Schema<IDoctorSpecialist>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

const availabilitySchema = new Schema<IAvailability>({
  dayName: { type: String, required: true },
  availableTime: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
});

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, 'User Name is missing'],
    default: ''
  },
  email: {
    type: String,
    required: [true, 'User email is missing'],
    trim: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'User phone is missing'],
    trim: true,
    default: ''
  },
  userType: {
    type: String,
    required: [true, 'User type is missing'],
    trim: true,
  },
  isBlock: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  password: {
    type: String,
    required: [true, 'User password is missing'],
    minlength: [6, 'User password should be at least 6 characters'],
    set: (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
  },
  img: {
    type: String,
    default: '/default/users/default_user.png'
  },
  price: {
    type: String,
    trim: true,
    default: ''
  },
  discretion: {
    type: String,
    trim: true,
    default: ''
  },
  cityId: {
    type: String,
    trim: true,
    default: ''
  },
  nearHospitalId: {
    type: String,
    trim: true,
    default: ''
  },
  languages: [languageSchema],
  doctorSpecialist: [doctorSpecialistSchema],
  availability: [availabilitySchema]
}, { timestamps: true });

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUser>('huslak-app-users', userSchema);