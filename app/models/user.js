var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);//(模型名，模式)通过编译来生成这个模型
module.exports = User;