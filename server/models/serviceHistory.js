const mongoose = require('mongoose');

const serviceHistorySchema = new mongoose.Schema({
    provider_id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    details: String,
    date: String,
});

module.exports = mongoose.model('ServiceHistory', serviceHistorySchema);
