const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,select:false},
    bio: { type: String, required: true },
    profilePic: { type: String}
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);

module.exports = userModel