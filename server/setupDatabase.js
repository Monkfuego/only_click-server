const mongoose = require('mongoose');

// MongoDB connection URI
require('dotenv').config();
const uri = process.env.MONGO_URI;

// Define Mongoose Schemas and Models

// Providers Schema
const providerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact_info: String,
    service_details_id: String,
});
const Provider = mongoose.model('Provider', providerSchema);

// ServiceDetails Schema
const serviceDetailsSchema = new mongoose.Schema({
    _id: String, // Custom ID
    rating: Number,
    average_time: String,
    type: String,
    pricing: {
        basic: Number,
        premium: Number,
    },
    plan: String,
});
const ServiceDetails = mongoose.model('ServiceDetails', serviceDetailsSchema);

// ServiceHistory Schema
const serviceHistorySchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    details: String,
    date: String,
});
const ServiceHistory = mongoose.model('ServiceHistory', serviceHistorySchema);

// Users Schema
const userSchema = new mongoose.Schema({
    _id: String, // Custom ID
    auth_info: {
        email: String,
        password_hash: String,
    },
    name: String,
    contact_info: String,
});
const User = mongoose.model('User', userSchema);

// BookingHistory Schema
const bookingHistorySchema = new mongoose.Schema({
    user_id: String,
    provider_id: mongoose.Schema.Types.ObjectId,
    details: String,
    date: String,
});
const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

// Expenditure Schema
const expenditureSchema = new mongoose.Schema({
    user_id: String,
    amount: Number,
    date: String,
});
const Expenditure = mongoose.model('Expenditure', expenditureSchema);

// BookingSlots Schema
const bookingSlotSchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    slot_date: String,
    start_time: String,
    end_time: String,
    is_booked: Boolean,
    user_id: String,
});
const BookingSlot = mongoose.model('BookingSlot', bookingSlotSchema);

// Function to set up collections and log IDs
async function setupDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Providers Collection
        const provider = new Provider({
            name: "John's Services",
            address: "123 Main Street",
            contact_info: "john@example.com",
            service_details_id: "service_details_123",
        });
        const savedProvider = await provider.save();
        console.log(`Provider created with ID: ${savedProvider._id}`);

        // ServiceDetails Collection
        const serviceDetails = new ServiceDetails({
            _id: "service_details_123", // Custom ID
            rating: 4.5,
            average_time: "30 minutes",
            type: "Cleaning",
            pricing: {
                basic: 100,
                premium: 150,
            },
            plan: "Basic cleaning and premium packages",
        });
        await serviceDetails.save();
        console.log(`ServiceDetails created with ID: service_details_123`);

        // ServiceHistory Collection
        const serviceHistory = new ServiceHistory({
            provider_id: savedProvider._id,
            user_id: "user_456",
            details: "Deep cleaning service completed",
            date: new Date().toISOString(),
        });
        const savedServiceHistory = await serviceHistory.save();
        console.log(`ServiceHistory created with ID: ${savedServiceHistory._id}`);

        // Users Collection
        const user = new User({
            _id: "user_456", // Custom ID
            auth_info: {
                email: "user@example.com",
                password_hash: "hashed_password",
            },
            name: "John Doe",
            contact_info: "123-456-7890",
        });
        await user.save();
        console.log(`User created with ID: user_456`);

        // BookingHistory Collection
        const bookingHistory = new BookingHistory({
            user_id: "user_456",
            provider_id: savedProvider._id,
            details: "Regular cleaning service",
            date: new Date().toISOString(),
        });
        const savedBookingHistory = await bookingHistory.save();
        console.log(`BookingHistory created with ID: ${savedBookingHistory._id}`);

        // Expenditure Collection
        const expenditure = new Expenditure({
            user_id: "user_456",
            amount: 150.0,
            date: new Date().toISOString(),
        });
        const savedExpenditure = await expenditure.save();
        console.log(`Expenditure created with ID: ${savedExpenditure._id}`);

        // BookingSlots Collection
        const bookingSlot = new BookingSlot({
            provider_id: savedProvider._id,
            slot_date: "2024-12-20",
            start_time: "09:00",
            end_time: "10:00",
            is_booked: false,
            user_id: null,
        });
        const savedBookingSlot = await bookingSlot.save();
        console.log(`BookingSlot created with ID: ${savedBookingSlot._id}`);

        console.log('All collections and documents have been created successfully!');
    } catch (error) {
        console.error('Error setting up MongoDB:', error);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
setupDatabase();
