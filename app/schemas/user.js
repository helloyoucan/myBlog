var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10; //计算强度，默认为10
var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
});
UserSchema.pre('save', function (next) {
    //每次保存数据都会调用这样方法
    var user = this;
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next("密码哈希失败:" + err)
            }
            user.password = hash
            next()
        })
    });
});
UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch)
        })
    }
}
module.exports = UserSchema;