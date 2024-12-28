const mongoose = require('mongoose');

const bookingHistorySchema = new mongoose.Schema({
    user_id: String,
    provider_id: mongoose.Schema.Types.ObjectId,
    details: String,
    date: String,
});

module.exports = mongoose.model('BookingHistory', bookingHistorySchema);
