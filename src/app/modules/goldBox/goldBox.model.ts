import mongoose from "mongoose";

const goldBoxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const GoldBoxModel = mongoose.model("GoldBox", goldBoxSchema);
