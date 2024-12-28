const mongoose = require('mongoose');

const bookingSlotSchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    slot_date: String,
    start_time: String,
    end_time: String,
    is_booked: Boolean,
    user_id: String,
});

module.exports = mongoose.model('BookingSlot', bookingSlotSchema);
