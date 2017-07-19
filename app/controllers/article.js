var Article = require('../models/article');
var Comment = require('../models/comment');
var handleFile = require('../middleware/handleFile');
var _ = require('underscore');
exports.article = function (req, res) {
    var id = req.params.id;
    if (id) {
        Article.findById(id, function (err, article) {
            if (err) {
                console.log(err)
            } else {
                Article.find({
                    "tags": {"$in": article.tags},
                    "_id": {"$ne": article._id}
                }, ["_id", "title"], function (err, related_articles) {
                    if (err) {
                        console.log(err);
                    } else {
                        article.related_articles = related_articles;
                        Comment.find({article: article._id}, function (err, comments) {
                            if (err) {
                                console.log(err);
                            } else {
                                article.comments = comments;
                                res.render('article', {
                                    article: article,
                                });
                            }
                        })
                    }
                })

            }
        })
    }

}
exports.save = function (req, res) {
    var articleObj = req.body;
    var _article;
    if (articleObj._id) {//已经保存过信息
        Article.findById(articleObj._id, function (err, article) {
            if (err) {
                console.log("错误了:" + err);
            } else {
                articleObj.preview = articleObj.content.substring(0, 300);
                articleObj.fileName = handleFile.writeMdSync(articleObj);
                _article = _.extend(article, articleObj);
                _article.save(function (err, article) {
                    if (err) {
                        console.error(err)
                        res.json({isSuccess: false, "results ": err});
                    } else {
                        res.json({isSuccess: true, "results ": article});
                    }
                });
            }
        })
    } else {//还没有保存过信息
        delete articleObj._id;
        articleObj.preview = articleObj.content.substring(0, 300);
        articleObj.fileName = handleFile.writeMdSync(articleObj);
        _article = new Article(articleObj);
        _article.save(function (err, article) {
            if (err) {
                console.log(err);
                res.json({isSuccess: false, results: err});
            } else {
                res.json({isSuccess: true, results: article});
            }
        })
    }
}
exports.softDel = function (req, res) {
    var ids = req.body.ids;
    var isDel = req.body.isDel;
    if (ids.length > 0) {
        Article.update({"_id": {$in: ids}}, {$set: {isDel: isDel ? 0 : 1}}, {multi: true}, function (err, results) {
            console.log(results)
            if (err) {
                res.json({isSuccess: false, results: err});
            } else {
                res.json({isSuccess: true, results: results});
            }
        })
    }
}
exports.del = function (req, res) {
    var ids = req.body.ids;
    if (ids.length) {
        Article.remove({"_id": {$in: ids},}, {multi: true}, function (err, results) {
                if (err) {
                    res.json({isSuccess: false, results: err});
                } else {
                    res.json({isSuccess: true, results: results});
                }
            }
        )
    }
}
exports.getById = function (req, res) {
    var id = req.params.id;
    if (id) {
        Article.findById(id, function (err, article) {
            if (err) {
                res.json({isSuccess: false, "results": err});
            } else {
                Comment.find({article: article._id}, function (err, comments) {
                    if (err) {
                        console.log(err);
                    } else {
                        article = JSON.parse(JSON.stringify(article));
                        article.comments = comments || [];
                        article.content = handleFile.readMdSync(article.fileName);
                        res.json({isSuccess: true, "results": article});
                    }
                })

            }
        })
    }
}
exports.getContent = function (req, res) {
    var fileName = req.body.fileName;
    console.log(req)
    var content = handleFile.readMdSync(fileName);
    res.json({isSuccess: true, content: content});
}
exports.list = function (req, res) {
    var keyword = req.body.keyword;//搜索的关键字
    var currentPage = parseInt(req.body.currentPage, 10) || 1;//当前页
    var currentNum = parseInt(req.body.currentNum, 10) || 10;//每页数量
    var index = (currentPage - 1) * currentNum;//用于把数据分割
    Article
        .find({
            title: new RegExp(keyword + '.*', 'i'),
            isDel: 0
        })
        .exec(function (err, articlesList) {
            if (err) {
                console.log("首页错误了");
            } else {
                var results = articlesList.slice(index, index + currentNum)
                res.json({
                    isSuccess: true,
                    articlesList: results,
                    list: {
                        keyword: keyword,
                        currentPage: currentPage,//当前页
                        currentNum: currentNum,//每页数量
                        total: articlesList.length,//总数量
                    }
                });
            }

        })
}
exports.recycleBin = function (req, res) {
    var keyword = req.body.keyword;//搜索的关键字
    var currentPage = parseInt(req.body.currentPage, 10) || 1;//当前页
    var currentNum = parseInt(req.body.currentNum, 10) || 10;//每页数量
    var index = (currentPage - 1) * currentNum;//用于把数据分割
    Article.find({
        isDel: 1,
        title: new RegExp(keyword + '.*', 'i')
    }, ['_id', 'title', 'meta'], function (err, articlesList) {
        var results = articlesList.slice(index, index + currentNum)
        if (err) {
            console.log(err);
            res.json({isSuccess: false});
        } else {
            res.json({
                isSuccess: true,
                articlesList: results,
                list: {
                    keyword: keyword,
                    currentPage: currentPage,//当前页
                    currentNum: currentNum,//每页数量
                    total: articlesList.length,//总数量
                }
            });
        }
    })
}