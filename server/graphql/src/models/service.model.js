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
      enum: ["carpenter", "plumber", "pest control", "electrician", "cleaner"],
    },
  ],
});

export const Service = mongoose.model("Service", serviceSchema);
