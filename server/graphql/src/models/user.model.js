import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; //for hashing our passwords
const userSchema = new Schema(
    {
      businessName: {
        type: String,
        required: true,
      },
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
      businessType: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  

userSchema.pre("save", async function (next) {
    console.log("checking if it even reaches here for saving pass?")
  if (!this.isModified("password")) return next();
  console.log("checking if it even reaches here for saving pass2?")

  this.password = await bcrypt.hash(this.password, 10);
  console.log("checking if it even reaches here for saving pass3?")
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    console.log("checking if it even reaches here for generating token?")
    console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
