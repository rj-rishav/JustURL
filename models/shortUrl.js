const mongoose = require('mongoose')

// Url Schema
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
})

// User Model
const User = mongoose.model('User', urlSchema)

module.exports = User