const mongoose = require("mongoose");

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
module.exports = mongoose.model("User" , userSchema);