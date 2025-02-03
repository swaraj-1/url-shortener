const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory:[{
        ip: String,
        timestamp: {
            type: Date,
        }

    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})
const Url = mongoose.model('url', urlSchema)
module.exports = Url;