const express = require("express");
const dotenv = required("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const providerRoutes = require("./src/routes/provider.routes");
const serviceRoutes = require("./src/routes/service.routes");

const app = express();
dotenv.config({
  path: "./env",
});
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({ origin: "*" }));

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://ljremi:gGTNbMwTNEENQzdq@cluster0.6ok7t.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/user", userRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/service", serviceRoutes);

// // Mongoose Models
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

// // RESTful Routes

// // Users
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
//   console.log("====================================");
//   console.log("i am here");
//   console.log("====================================");
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
//   const { name, email, passwordHash, contactInfo } = req.body;
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { name, authInfo: { email, passwordHash }, contactInfo },
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

// // Providers
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

// // Booking Histories
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
//     console.log("====================================");
//     console.log("ths is attendance at bookingHistories");
//     console.log("====================================");
//     const bookingHistory = new BookingHistory({
//       userId: Number(userId),
//       providerId,
//       details,
//       date,
//     });
//     await bookingHistory.save();
//     res.status(201).json(bookingHistory);
//   } catch (error) {
//     console.log("====================================");
//     console.log("this is error while posting booking history", error);
//     console.log("====================================");
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

// // Booking Slots
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
//   console.log("this is the be part attendance for bookingslots");
//   const { providerId, slotDate, startTime, endTime } = req.body;
//   console.log("====================================");
//   console.log(providerId);
//   console.log(slotDate);
//   console.log(startTime);
//   console.log(endTime);
//   console.log("====================================");
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
//     console.log("error in bookingslots", error);
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

// // Expenditures
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

// Server

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});