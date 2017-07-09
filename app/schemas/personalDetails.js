var mongoose = require('mongoose')
var PersonalDetailsSchema = new mongoose.Schema({
    iconUrl: String,
    name: String,
    emial: [{
        type: String
    }],
    github: {
        name: String,
        url: String,
        iconUrl: String
    },
    other: [{
        name: String,
        url: String,
        iconUrl: String
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
        ,
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})
module.exports = PersonalDetailsSchema