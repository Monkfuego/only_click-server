import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Provider", 
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    address:{
        type:String,
        required:true
    },
    status: {
      type: String,
      enum: ["pending", "cancel", "complete", "expired"],
      default: "pending",
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, 
      required: true,
    },
    endTime: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

bookingSchema.pre("find", function () {
  const currentDate = new Date();
  this.updateMany(
    {
      status: { $in: ["pending", "cancel"] },
      $expr: {
        $lt: [
          {
            $dateFromParts: {
              year: { $year: "$date" },
              hour: { $hour: "$endTime" },
              minute: { $minute: "$endTime" },
            },
          },
          currentDate,
        ],
      },
    },
    { status: "expired" }
  );
});

export const Booking= mongoose.model("Booking", bookingSchema);
