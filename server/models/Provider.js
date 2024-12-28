const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact_info: String,
    service_details_id: String,
});

module.exports = mongoose.model('Provider', providerSchema);
