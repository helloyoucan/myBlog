var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ArticleSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    content: String,
    read: {
        type: Number,
        default: 0
    },
    comments: [{
        type: ObjectId,
        ref: 'Comments'
    },],
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
});
ArticleSchema.pre('save', function (next) {
    //每次保存数据都会调用这样方法
    if (this.isNew) {
        this.meta.createAt = this.meta.up = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
ArticleSchema.statics = {
    findById: function (id, cb) {
        return this
            .findOne({
                "_id": id
            })
            .exec(cb) //执行回调
    }
}
module.exports = ArticleSchema