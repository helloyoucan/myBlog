var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('Comment', CommentSchema);//(模型名(表名)，模式(表字段))通过编译来生成这个模型

module.exports = Comment;