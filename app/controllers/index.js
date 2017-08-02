var PersonalDetails = require('../models/personalDetails');
var Article = require('../models/article');
var _ = require('underscore');
exports.index = function (req, res) {
    PersonalDetails.findOne({}, function (err, message) {
        if (err) {
            console.log("错误了:" + err);
        } else {
            var keyword = "";//搜索的关键字
            var currentPage = 1;//当前页
            var currentNum = 10;//每页数量
            var index = (currentPage - 1) * currentNum;//查询
            Article.fetch({
                title: new RegExp(keyword + '.*', 'i'),
                isDel: 0
            }, function (err, articlesList) {
                if (err) {
                    console.log("首页错误了" + err);
                } else {
                    var results = articlesList.slice(index, index + currentNum);
                    res.render('index', {
                        title: 'helloyoucan个人博客',
                        message: message,
                        articles: results,
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
    });

}
//获取个人信息
exports.getDetail = function (req, res) {
    PersonalDetails.findOne({}, function (err, message) {
        if (err) {
            res.json({isSuccess: false, "message": err});
        } else {
            res.json({isSuccess: true, "message": message});
        }
    });
}
exports.save = function (req, res) {
    //console.log(req.body);
    var messageObj = req.body;
    var _message;
    if (messageObj._id) {//已经保存过信息
        PersonalDetails.findById(messageObj._id, function (err, message) {
            if (err) {
                console.log("错误了:" + err);
            } else {
                _message = _.extend(message, messageObj);
                message.save(function (err, message) {
                    if (err) {
                        console.error(err)
                        res.json({isSuccess: false, "message": err});
                    } else {//还没有保存过信息
                        res.json({isSuccess: true, "message": message});
                    }
                });
            }
        })
    } else {
        delete messageObj._id;
        _message = new PersonalDetails(messageObj);
        _message.save(function (err, message) {
            if (err) {
                console.log(err);
                res.json({isSuccess: false, "message": err});
            } else {
                res.json({isSuccess: true, "message": message});
            }
        })
    }
}
exports.uploadImg = function (req, res) {
    var files = req.files;
    var paths = [];
    files.forEach(function (value, index, arr) {
        paths.push('http://' + req.headers.host + value.path.replace(/\\/g, "/").replace("public", ""))
    });
    if (files.length > 0) {
        console.log(files)
        res.json({
            isSuccess: 'true',
            paths: paths,
        });
    } else {
        res.json({
            isSuccess: 'false',
        })
    }
}

