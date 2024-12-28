const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
    user_id: String,
    amount: Number,
    date: String,
});

module.exports = mongoose.model('Expenditure', expenditureSchema);
