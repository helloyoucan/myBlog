var User = require('../models/user')
var _ = require('underscore');
//signin
exports.signin = function (req, res) {
    var _user = req.body;
    var username = _user.username
    var password = _user.password;
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            console.log("错误:" + err);
        }
        if (!user) {
            res.json({isSuccess: false, message: '用户不存在'})
            return
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log("错误:" + err);
                res.json({isSuccess: false, message: '未知错误'})
            }
            if (isMatch) {
                console.log('登录成功');
                req.session.user = user;
                res.json({isSuccess: true, user: user, message: '登录成功'})
                return;
            } else {
                res.json({isSuccess: false, message: '密码错误'})
                return;
            }
        });
    });
};
//logout
exports.logout = function (req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.json({isSuccess: true, message: '退出登录成功'})
};
exports.save = function (req, res) {
    var userObj = req.body;
    User.findOne({
        username: userObj.username
    }, function (err, user) {
        //判断用户名是否已经存在
        if (err) {
            console.log(err);
            res.json({isSuccess: false, message: '未知错误'})
            return
        }
        if (!user) {
            console.log("用户名已存在")
            _user = _.extend(user, userObj);
            _user.save(function (err, user) {
                if (err) {
                    res.json({isSuccess: false, message: '未知错误'})
                }
                res.json({isSuccess: true, results: user, message: '修改成功'})
            });
        } else {
            user = new User(userObj)
            user.save(function (err, user) {
                if (err) {
                    res.json({isSuccess: false, message: '未知错误'})
                }
                res.json({isSuccess: true, results: user, message: '新增成功'})
            });
        }
    });


};
//midware for user
exports.signinRequired = function (req, res, next) {
    var user = req.session.user
    if (!user) {
        res.json({isSuccess: false, isSignin: false, message: '用户为未登录'})
    } else {
        next();
    }

};