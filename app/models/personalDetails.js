var mongoose = require('mongoose');
var PersonalDetailsSchema = require('../schemas/personalDetails');
var PersonalDetails = mongoose.model('PersonalDetails', PersonalDetailsSchema);//(模型名，模式)通过编译来生成这个模型

module.exports = PersonalDetails;