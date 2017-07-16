var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId//Schema.Type是由Mongoose内定的一些数据类型，基本数据类型都在其中，Mongoose也内置了一些特有的Schema.Type

var CommentSchema = new mongoose.Schema({
    article: {type: ObjectId, ref: 'Article'},
    reply: [{
        time: {
            type: Date,
            default: Date.now()
        },
        content: String
    }],
    content: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

CommentSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('time')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = CommentSchema