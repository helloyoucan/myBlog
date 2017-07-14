var Article = require('../models/article');
var _ = require('underscore');
exports.article = function (req, res) {
    res.render('article', {
        title: '文章名',
        article: {
            title: '文章标题',
            tags: ['文章标签1', '文章标签'],
            update: '2016.05.12 05:56',
            read: 56,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.',
            comments: [
                {
                    time: '2017.05.21 12:25',
                    content: '留言内容1'
                },
                {
                    time: '2017.05.21 12:25',
                    content: '留言内容2'
                }],
            related_articles: [
                {
                    id: '001',
                    title: '推荐文章推荐文章推荐文章推荐文章推荐文章推荐文章推荐文章',
                }, {
                    id: '001',
                    title: '推荐文章',
                }],
        },
    });
}
exports.save = function (req, res) {
    var articleObj = req.body;
    console.log(articleObj);
    var _article;
    if (articleObj._id) {//已经保存过信息
        Article.findById(articleObj._id, function (err, article) {
            if (err) {
                console.log("错误了:" + err);
            } else {
                _article = _.extend(article, articleObj);
                article.save(function (err, article) {
                    if (err) {
                        console.error(err)
                        res.json({isSuccess: false, "results ": err});
                    } else {//还没有保存过信息
                        res.json({isSuccess: true, "results ": article});
                    }
                });
            }
        })
    } else {
        delete articleObj._id;
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
exports.del = function (req, res) {
    var id = req.body.id;
    console.log(req.body)
    if (id) {
        Article.remove({
            _id: id
        }, function (err, results) {
            if (err) {
                res.json({isSuccess: false, "results": err});
            } else {
                res.json({isSuccess: true, "results": results});
            }
        })
    }
}
exports.getById = function (req, res) {
    var id = req.params.id;
    console.log(req);
    if (id) {
        Article.findById(id, function (err, results) {
            if (err) {
                res.json({isSuccess: false, "results": err});
            } else {
                res.json({isSuccess: true, "results": results});
            }
        })
    }
}
exports.list = function (req, res) {
    var keyword = req.body.keyword;//搜索的关键字
    var currentPage = parseInt(req.body.currentPage, 10) || 1;//当前页
    var currentNum = parseInt(req.body.currentNum, 10) || 10;//每页数量
    var index = (currentPage - 1) * currentNum;//查询
    Article
        .find({
            title: new RegExp(keyword + '.*', 'i')
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