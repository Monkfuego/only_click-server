const mongoose = require('mongoose');

// Booking History Schema
const bookingHistorySchema = new mongoose.Schema({
    user_id: String,
    provider_id: mongoose.Schema.Types.ObjectId,
    details: String,
    date: String,
});
const BookingHistory = mongoose.models.BookingHistory || mongoose.model('BookingHistory', bookingHistorySchema);

// Booking Slot Schema
const bookingSlotSchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    slot_date: String,
    start_time: String,
    end_time: String,
    is_booked: Boolean,
    user_id: String,
});
const BookingSlot = mongoose.models.BookingSlot || mongoose.model('BookingSlot', bookingSlotSchema);

// Expenditure Schema
const expenditureSchema = new mongoose.Schema({
    user_id: String,
    amount: Number,
    date: String,
});
const Expenditure = mongoose.models.Expenditure || mongoose.model('Expenditure', expenditureSchema);

// Provider Schema
const providerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact_info: String,
    service_details_id: String,
});
const Provider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);

// Service Details Schema
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
const ServiceDetails = mongoose.models.ServiceDetails || mongoose.model('ServiceDetails', serviceDetailsSchema);

// Service History Schema
const serviceHistorySchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    details: String,
    date: String,
});
const ServiceHistory = mongoose.models.ServiceHistory || mongoose.model('ServiceHistory', serviceHistorySchema);

// User Schema
const userSchema = new mongoose.Schema({
    _id: String, // Custom ID
    auth_info: {
        email: String,
        password_hash: String,
    },
    name: String,
    contact_info: String,
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Exporting all models
module.exports = {
    BookingHistory,
    BookingSlot,
    Expenditure,
    Provider,
    ServiceDetails,
    ServiceHistory,
    User,
};
