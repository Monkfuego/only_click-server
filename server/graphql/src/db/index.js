import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect("mongodb://localhost:27017/onlyclick");
    console.log("connected to mongodb", connectionInstance.connection.host);
  } catch (error) {
    console.log("error in connecting to mongodb database", error);
    process.exit(1);
  }
};
export default connectDB
