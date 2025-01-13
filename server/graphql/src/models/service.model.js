import mongoose, { Schema } from "mongoose";
const serviceSchema = new Schema({
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
  name: {
    type: "String",
    required: true,
  },
  category: [
    {
      type: String,
      default: "carpenter",
      enum: ["carpenter", "plumber", "pest", "electrician", "cleaner"],
    },
  ],
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  serviceAt: {
    type: String,
    default: "onsite",
    enum: ["online", "remote", "onsite"],
  },
  description: {
    type: String,
  },
  timeApprox: {
    type: String,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
});

export const Service = mongoose.model("Service", serviceSchema);
