import mongoose, { Schema } from "mongoose";

const providerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Provider= mongoose.model("Provider", providerSchema);
