const mongoose = require('mongoose');

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

module.exports = mongoose.model('ServiceDetails', serviceDetailsSchema);
