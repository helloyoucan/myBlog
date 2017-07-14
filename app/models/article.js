var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article');
var Article = mongoose.model('Article', ArticleSchema);//(模型名(表名)，模式(表字段))通过编译来生成这个模型

module.exports = Article;