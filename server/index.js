import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './graphql/src/routes/user.routes.js';
import bookingRoutes from './graphql/src/routes/booking.routes.js';
import serviceRoutes from './graphql/src/routes/service.routes.js';
import providerRoutes from './graphql/src/routes/provider.routes.js';
import connectDB from './graphql/src/db/index.js';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser())
app.use(cors({ origin: "*" }));
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port 3000`);
    })
})
.catch((error)=>{
    console.log('MongoDB connection failed',error);
    
})

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/provider", providerRoutes);


// const bookingHistorySchema = new mongoose.Schema({
//   userId: String,
//   providerId: Number,
//   details: String,
//   date: String,
// });
// const BookingHistory = mongoose.model("BookingHistory", bookingHistorySchema);

// const bookingSlotSchema = new mongoose.Schema({
//   providerId: Number,
//   slotDate: String,
//   startTime: String,
//   endTime: String,
//   isBooked: Boolean,
// });
// const BookingSlot = mongoose.model("BookingSlot", bookingSlotSchema);

// const expenditureSchema = new mongoose.Schema({
//   userId: Number,
//   amount: Number,
//   date: String,
//   description: String,
// });
// const Expenditure = mongoose.model("Expenditure", expenditureSchema);

// const providerSchema = new mongoose.Schema({
//   name: String,
//   address: String,
//   contactInfo: String,
//   services: [
//     "Bulb Fixing",
//     "Toilet Cleaning",
//     "AC Cleaning",
//     "Floor Cleaning",
//     "Carpentry",
//   ],
// });
// const Provider = mongoose.model("Provider", providerSchema);

// const userSchema = new mongoose.Schema({
//   email: String,
//   address: String,
//   pincode: Number,
//   businesstype: String,
//   password: String,
//   contactInfo: String,
// });
// const User = mongoose.model("User", userSchema);

// app.get("/api/user", async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// app.get("/api/user/:id", async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) return res.status(404).send("User not found");
//   res.json(user);
// });

// app.post("/api/user", async (req, res) => {
//   const { email, passwordHash, contactInfo, businesstype, address, pincode } =
//     req.body;
//   const user = new User({
//     email: email,
//     address: address,
//     pincode: pincode,
//     businesstype: businesstype,
//     password: passwordHash,
//     contactInfo: contactInfo,
//   });
//   await user.save();
//   res.status(201).json(user);
// });

// app.put("/api/user/:id", async (req, res) => {
//   const { email, passwordHash, contactInfo, businesstype, address, pincode } =
//     req.body;
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     {
//       email: email,
//       address: address,
//       pincode: pincode,
//       businesstype: businesstype,
//       password: passwordHash,
//       contactInfo: contactInfo,
//     },
//     { new: true }
//   );
//   if (!user) return res.status(404).send("User not found");
//   res.json(user);
// });

// app.delete("/api/user/:id", async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);
//   if (!user) return res.status(404).send("User not found");
//   res.send("User deleted");
// });

// app.get("/api/providers", async (req, res) => {
//   const providers = await Provider.find();
//   res.json(providers);
// });

// app.get("/api/providers/:id", async (req, res) => {
//   const provider = await Provider.findById(req.params.id);
//   if (!provider) return res.status(404).send("Provider not found");
//   res.json(provider);
// });

// app.post("/api/providers", async (req, res) => {
//   const { name, address, contactInfo } = req.body;
//   const provider = new Provider({ name, address, contactInfo });
//   await provider.save();
//   res.status(201).json(provider);
// });

// app.put("/api/providers/:id", async (req, res) => {
//   const { name, address, contactInfo } = req.body;
//   const provider = await Provider.findByIdAndUpdate(
//     req.params.id,
//     { name, address, contactInfo },
//     { new: true }
//   );
//   if (!provider) return res.status(404).send("Provider not found");
//   res.json(provider);
// });

// app.delete("/api/providers/:id", async (req, res) => {
//   const provider = await Provider.findByIdAndDelete(req.params.id);
//   if (!provider) return res.status(404).send("Provider not found");
//   res.send("Provider deleted");
// });

// app.get("/api/bookingHistories", async (req, res) => {
//   const bookingHistories = await BookingHistory.find();
//   res.json(bookingHistories);
// });

// app.get("/api/bookingHistories/:id", async (req, res) => {
//   const bookingHistory = await BookingHistory.findById(req.params.id);
//   if (!bookingHistory) return res.status(404).send("Booking history not found");
//   res.json(bookingHistory);
// });

// app.post("/api/bookingHistories", async (req, res) => {
//   const { userId, providerId, details, date } = req.body;
//   try {
//     const bookingHistory = new BookingHistory({
//       userId: Number(userId),
//       providerId,
//       details,
//       date,
//     });
//     await bookingHistory.save();
//     res.status(201).json(bookingHistory);
//   } catch (error) {
//     console.error("Error while posting booking history", error);
//   }
// });

// app.put("/api/bookingHistories/:id", async (req, res) => {
//   const { userId, providerId, details, date } = req.body;
//   const bookingHistory = await BookingHistory.findByIdAndUpdate(
//     req.params.id,
//     { userId, providerId, details, date },
//     { new: true }
//   );
//   if (!bookingHistory) return res.status(404).send("Booking history not found");
//   res.json(bookingHistory);
// });

// app.delete("/api/bookingHistories/:id", async (req, res) => {
//   const bookingHistory = await BookingHistory.findByIdAndDelete(req.params.id);
//   if (!bookingHistory) return res.status(404).send("Booking history not found");
//   res.send("Booking history deleted");
// });

// app.get("/api/bookingSlots", async (req, res) => {
//   const bookingSlots = await BookingSlot.find();
//   res.json(bookingSlots);
// });

// app.get("/api/bookingSlots/:id", async (req, res) => {
//   const bookingSlot = await BookingSlot.findById(req.params.id);
//   if (!bookingSlot) return res.status(404).send("Booking slot not found");
//   res.json(bookingSlot);
// });

// app.post("/api/bookingSlots", async (req, res) => {
//   const { providerId, slotDate, startTime, endTime } = req.body;
//   try {
//     const bookingSlot = new BookingSlot({
//       providerId,
//       slotDate,
//       startTime,
//       endTime,
//       isBooked: true,
//     });
//     await bookingSlot.save();
//     res.status(201).json(bookingSlot);
//   } catch (error) {
//     console.error("Error in booking slots", error);
//   }
// });

// app.put("/api/bookingSlots/:id", async (req, res) => {
//   const { providerId, slotDate, startTime, endTime, isBooked } = req.body;
//   const bookingSlot = await BookingSlot.findByIdAndUpdate(
//     req.params.id,
//     { providerId, slotDate, startTime, endTime, isBooked },
//     { new: true }
//   );
//   if (!bookingSlot) return res.status(404).send("Booking slot not found");
//   res.json(bookingSlot);
// });

// app.delete("/api/bookingSlots/:id", async (req, res) => {
//   const bookingSlot = await BookingSlot.findByIdAndDelete(req.params.id);
//   if (!bookingSlot) return res.status(404).send("Booking slot not found");
//   res.send("Booking slot deleted");
// });

// app.get("/api/expenditures", async (req, res) => {
//   const expenditures = await Expenditure.find();
//   res.json(expenditures);
// });

// app.get("/api/expenditures/:id", async (req, res) => {
//   const expenditure = await Expenditure.findById(req.params.id);
//   if (!expenditure) return res.status(404).send("Expenditure not found");
//   res.json(expenditure);
// });

// app.post("/api/expenditures", async (req, res) => {
//   const { userId, amount, date, description } = req.body;
//   const expenditure = new Expenditure({ userId, amount, date, description });
//   await expenditure.save();
//   res.status(201).json(expenditure);
// });

// app.put("/api/expenditures/:id", async (req, res) => {
//   const { userId, amount, date, description } = req.body;
//   const expenditure = await Expenditure.findByIdAndUpdate(
//     req.params.id,
//     { userId, amount, date, description },
//     { new: true }
//   );
//   if (!expenditure) return res.status(404).send("Expenditure not found");
//   res.json(expenditure);
// });

// app.delete("/api/expenditures/:id", async (req, res) => {
//   const expenditure = await Expenditure.findByIdAndDelete(req.params.id);
//   if (!expenditure) return res.status(404).send("Expenditure not found");
//   res.send("Expenditure deleted");
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
