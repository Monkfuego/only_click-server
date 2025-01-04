const mongoose = require('mongoose');
require('dotenv').config();

const uri = "mongodb+srv://ljremi:gGTNbMwTNEENQzdq@cluster0.6ok7t.mongodb.net/";

// Define Mongoose Schemas and Models
const providerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact_info: String,
    service_details_id: String,
});
const Provider = mongoose.model('Provider', providerSchema);

const serviceDetailsSchema = new mongoose.Schema({
    _id: String,
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

const serviceHistorySchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    details: String,
    date: String,
});
const ServiceHistory = mongoose.model('ServiceHistory', serviceHistorySchema);

const userSchema = new mongoose.Schema({
    _id: String,
    auth_info: {
        email: String,
        password_hash: String,
    },
    name: String,
    contact_info: String,
});
const User = mongoose.model('User', userSchema);

const bookingHistorySchema = new mongoose.Schema({
    user_id: String,
    provider_id: mongoose.Schema.Types.ObjectId,
    details: String,
    date: String,
});
const BookingHistory = mongoose.model('BookingHistory', bookingHistorySchema);

const expenditureSchema = new mongoose.Schema({
    user_id: String,
    amount: Number,
    date: String,
});
const Expenditure = mongoose.model('Expenditure', expenditureSchema);

const bookingSlotSchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    slot_date: String,
    start_time: String,
    end_time: String,
    is_booked: Boolean,
    user_id: String,
});
const BookingSlot = mongoose.model('BookingSlot', bookingSlotSchema);

// Function to generate sample documents
async function generateSamples() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        for (let i = 1; i <= 10; i++) {
            // Providers
            const provider = new Provider({
                name: `Provider ${i}`,
                address: `${i} Example Street`,
                contact_info: `provider${i}@example.com`,
                service_details_id: `service_details_${i}`,
            });
            const savedProvider = await provider.save();

            // ServiceDetails
            const serviceDetails = new ServiceDetails({
                _id: `service_details_${i}`,
                rating: (4 + (i % 2) * 0.5),
                average_time: `${20 + i} minutes`,
                type: i % 2 === 0 ? "Cleaning" : "Repair",
                pricing: {
                    basic: 50 + i * 10,
                    premium: 100 + i * 20,
                },
                plan: `Plan details for service ${i}`,
            });
            await serviceDetails.save();

            // Users
            const user = new User({
                _id: `user_${i}`,
                auth_info: {
                    email: `user${i}@example.com`,
                    password_hash: `hashed_password_${i}`,
                },
                name: `User ${i}`,
                contact_info: `123-456-78${i}0`,
            });
            const savedUser = await user.save();

            // ServiceHistory
            const serviceHistory = new ServiceHistory({
                provider_id: savedProvider._id,
                user_id: savedUser._id,
                details: `Service history details for user ${i}`,
                date: new Date().toISOString(),
            });
            await serviceHistory.save();

            // BookingHistory
            const bookingHistory = new BookingHistory({
                user_id: savedUser._id,
                provider_id: savedProvider._id,
                details: `Booking details for user ${i}`,
                date: new Date().toISOString(),
            });
            await bookingHistory.save();

            // Expenditure
            const expenditure = new Expenditure({
                user_id: savedUser._id,
                amount: 100 + i * 10,
                date: new Date().toISOString(),
            });
            await expenditure.save();

            // BookingSlots
            const bookingSlot = new BookingSlot({
                provider_id: savedProvider._id,
                slot_date: `2024-12-${10 + i}`,
                start_time: `${8 + i}:00`,
                end_time: `${9 + i}:00`,
                is_booked: i % 2 === 0,
                user_id: i % 2 === 0 ? savedUser._id : null,
            });
            await bookingSlot.save();
        }

        console.log('10 sample documents created for each collection successfully!');
    } catch (error) {
        console.error('Error generating samples:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
generateSamples();
