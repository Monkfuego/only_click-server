require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Import models
const Provider = require('./models/Provider');
const ServiceDetails = require('./models/serviceDetails');
const ServiceHistory = require('./models/serviceHistory');
const User = require('./models/User');
const BookingHistory = require('./models/bookingHistory');
const Expenditure = require('./models/expenditure');
const BookingSlot = require('./models/bookingSlot');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('Connection error:', err));

// CRUD API Endpoints

// Providers
app.post('/providers', async (req, res) => {
    try {
        const provider = new Provider(req.body);
        const savedProvider = await provider.save();
        res.status(201).json(savedProvider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/providers/:id', async (req, res) => {
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProvider);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ServiceDetails
app.post('/service-details', async (req, res) => {
    try {
        const serviceDetails = new ServiceDetails(req.body);
        const savedServiceDetails = await serviceDetails.save();
        res.status(201).json(savedServiceDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/service-details/:id', async (req, res) => {
    try {
        const updatedServiceDetails = await ServiceDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedServiceDetails);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ServiceHistory
app.post('/service-history', async (req, res) => {
    try {
        const serviceHistory = new ServiceHistory(req.body);
        const savedServiceHistory = await serviceHistory.save();
        res.status(201).json(savedServiceHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/service-history/:id', async (req, res) => {
    try {
        const updatedServiceHistory = await ServiceHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedServiceHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Users
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// BookingHistory
app.post('/booking-history', async (req, res) => {
    try {
        const bookingHistory = new BookingHistory(req.body);
        const savedBookingHistory = await bookingHistory.save();
        res.status(201).json(savedBookingHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/booking-history/:id', async (req, res) => {
    try {
        const updatedBookingHistory = await BookingHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBookingHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Expenditure
app.post('/expenditure', async (req, res) => {
    try {
        const expenditure = new Expenditure(req.body);
        const savedExpenditure = await expenditure.save();
        res.status(201).json(savedExpenditure);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/expenditure/:id', async (req, res) => {
    try {
        const updatedExpenditure = await Expenditure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExpenditure);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// BookingSlots
app.post('/booking-slots', async (req, res) => {
    try {
        const bookingSlot = new BookingSlot(req.body);
        const savedBookingSlot = await bookingSlot.save();
        res.status(201).json(savedBookingSlot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/booking-slots/:id', async (req, res) => {
    try {
        const updatedBookingSlot = await BookingSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBookingSlot);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
