var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ArticleSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    fileName: String,
    preview: String,
    isDel: {
        type: Number,
        default: 0//未删除
    },
    read: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
        ,
        updateAt: {
            type: Date,
            default: Date.now()
        },
        deleteAt: {
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
        this.meta.deleteAt = this.meta.updateAt = Date.now();
    }
    next();
});
ArticleSchema.statics = {
    fetch: function (opt, cb) {
        return this
            .find(opt)
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({
                "_id": id
            })
            .exec(cb) //执行回调
    }
}
module.exports = ArticleSchema