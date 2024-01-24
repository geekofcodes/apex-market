// User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // address: { type: String }, // Add the 'address' field
    // phoneNumber: { type: String }, // Add the 'phoneNumber' field
    // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
