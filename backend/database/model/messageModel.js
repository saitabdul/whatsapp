const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true},
    text: { type: String},
    image: { type: String},
    seen: { type: Boolean,default:false}
}, { timestamps: true })

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel