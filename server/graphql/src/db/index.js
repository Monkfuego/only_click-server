import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect("mongodb+srv://ljremi:gGTNbMwTNEENQzdq@cluster0.6ok7t.mongodb.net/");
    console.log("connected to mongodb", connectionInstance.connection.host);
  } catch (error) {
    console.log("error in connecting to mongodb database", error);
    process.exit(1);
  }
};
export default connectDB
