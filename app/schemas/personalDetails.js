var mongoose = require('mongoose')
var PersonalDetailsSchema = new mongoose.Schema({
    iconUrl: String,
    name: String,
    emails: [String],
    others: [{
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
});
PersonalDetailsSchema.pre('save', function (next) {
    //每次保存数据都会调用这样方法
    if (this.isNew) {
        this.meta.createAt = this.meta.up = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});
PersonalDetailsSchema.statics = {
    findById: function (id, cb) {
        return this
            .findOne({
                "_id": id
            })
            .exec(cb) //执行回调
    }
}
module.exports = PersonalDetailsSchema