var Article = require('../models/article');
var Comment = require('../models/comment');
var handleFile = require('../middleware/handleFile');
var _ = require('underscore');
var cos = require('../middleware/cos');
var markdown = require("markdown").markdown;
exports.article = function (req, res) {
    var id = req.params.id;
    if (id) {
        Article.findById(id, function (err, article) {
            if (err) {
                console.log(err)
            } else {
                /*article.read++;
                article.save(function (err, article) {
                    if (err) {
                        console.log("添加浏览次数失败" + err);
                    }
                });*/
                article.update({'read':article.read++},function () {
                    if (err) {
                        console.log("添加浏览次数失败" + err);
                    }else{
                        console.log('success!');
                    }
                });
                Article.find({
                    "tags": {"$in": article.tags},
                    "_id": {"$ne": article._id},
                    "isDel": 0,
                }, ["_id", "title"], function (err, related_articles) {
                    if (err) {
                        console.log(err);
                    } else {
                        article = JSON.parse(JSON.stringify(article));
                        article.related_articles = related_articles;
                        //article.content = markdown.toHTML(handleFile.readMdSync(article.fileName));
                        Comment.find({articleId: article._id}, function (err, comments) {
                            if (err) {
                                console.log(err);
                            } else {
                                article.comments = comments;
                                cos.get({
                                    key: article.fileName,
                                    success: function (data) {
                                        article.content = markdown.toHTML(data);
                                        res.render('article', {
                                            article: article,
                                        });
                                    },
                                    error: function (err) {
                                        console.log(err)
                                    }
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
                if (articleObj.tags.length == 0) {
                    articleObj.tags.push("其它");
                }
                articleObj.preview = markdown.toHTML(articleObj.content).replace(/<\/?.+?>/g, "").replace(/ /g, "").replace(/&\/?.+?;/g, "").substring(0, 300);
                _article = _.extend(article, articleObj);
                saveArticle(res, _article, articleObj.content);

            }
        })
    } else {//还没有保存过信息
        delete articleObj._id;
        articleObj.preview = markdown.toHTML(articleObj.content).replace(/<\/?.+?>/g, "").replace(/ /g, "").replace(/&\/?.+?;/g, "").substring(0, 300);
        if (articleObj.tags.length == 0) {
            articleObj.tags.push("其它");
        }
        _article = new Article(articleObj);
        saveArticle(res, _article, articleObj.content);
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
    var fileNames = req.body.fileNames;


    if (ids.length) {
        var keys = [];
        fileNames.forEach(function (value, index, array) {
            keys.push({
                Key: value,
            })
        });
        console.log(keys)
        cos.dels({
            keys: keys,
            success: function (data) {
                Article.remove({"_id": {$in: ids}}, function (err, results) {
                    if (err) {
                        console.log(err)
                        res.json({isSuccess: false, results: err});
                    } else {
                        res.json({isSuccess: true, results: data});
                    }
                });
            },
            error: function (err) {
                console.log(err)
                res.json({isSuccess: false, results: err});

            }
        });

    }
}
exports.getById = function (req, res) {
    var id = req.params.id;
    if (id) {
        Article.findById(id, function (err, article) {
            if (err) {
                res.json({isSuccess: false, "results": err});
            } else {
                Comment.find({articleId: article._id}, function (err, comments) {
                    if (err) {
                        console.log(err);
                    } else {
                        article = JSON.parse(JSON.stringify(article));
                        article.comments = comments || [];
                        //article.content = markdown.toHTML(handleFile.readMdSync(article.fileName));
                        console.log(article.fileName)
                        cos.get({
                            key: article.fileName,
                            success: function (data) {
                                article.content = markdown.toHTML(data);
                                res.json({isSuccess: true, "results": article});
                            },
                            error: function (err) {
                                res.json({isSuccess: false, "results": err});
                                console.log(err)
                            }
                        });

                    }
                })

            }
        })
    }
}
exports.getContent = function (req, res) {
    var fileName = req.body.fileName;
    //var content = handleFile.readMdSync(fileName);
    cos.get({
        key: fileName,
        success: function (data) {
            res.json({isSuccess: true, content: data});
        },
        error: function () {

        }
    });
}
exports.list = function (req, res) {
    var keyword = req.body.keyword;//搜索的关键字
    var currentPage = parseInt(req.body.currentPage, 10) || 1;//当前页
    var currentNum = parseInt(req.body.currentNum, 10) || 10;//每页数量
    var index = (currentPage - 1) * currentNum;//用于把数据分割
    Article
        .fetch({
            title: new RegExp(keyword + '.*', 'i'),
            isDel: 0
        }, function (err, articlesList) {
            if (err) {
                console.log("首页错误了");
            } else {
                var results = articlesList.slice(index, index + currentNum);
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
    }, ['_id', 'title', 'meta', 'fileName'], function (err, articlesList) {
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

function saveArticle(res, _article, content) {
    _article.save(function (err, article) {
        if (err) {
            console.error(err)
            res.json({isSuccess: false, "results ": err});
        } else {
            //生成.md文件到"./public/Markdown/"
            /*article.fileName = handleFile.writeMdSync({'_id': article._id,title: article.title, content: content});*/
            //上传文件到腾讯云bucket的myblog/markdown/目录下
            article.fileName = 'markdown/' + article.title.replace(/ /g, "") + '-' + article._id + '.md';
            cos.put({
                key: article.fileName,
                content: content,
                success: function (data) {
                    article.save(function (err, article) {
                        if (err) {
                            console.log(err);
                            res.json({isSuccess: false, results: err});
                        } else {
                            res.json({isSuccess: true, results: article});
                        }
                    });
                },
                error: function (err) {
                    console.log(err);
                    res.json({isSuccess: false, results: err});
                },

            })

        }
    });
}