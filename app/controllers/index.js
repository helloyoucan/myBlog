var PersonalDetails = require('../models/personalDetails');
var _ = require('underscore');
exports.index = function (req, res) {
    PersonalDetails.findOne({}, function (err, message) {
        if (err) {
            console.log("错误了:" + err);
        } else {
            console.log("获取成功：");
            res.render('index', {
                title: 'helloyoucan个人博客',
                message: message,
                article: {
                    id: '001',
                    title: '文章标题',
                    update: '2016.05.15 5:20',
                    content: '每个 APP 的堆（heap）内存大小有硬性限制，如果您的 APP 已达到堆内存限制，并尝试分配更多的内存，系统会抛出 OutOfMemoryError。为了避免 OOM ，您可以查询当前设备有多少堆空间，可以通过调用系统 getMemoryInfo() 查询，返回一个ActivityManager.MemoryInfo 对象，它提供该设备当前存储器的状态信息，包括可用的存储器，总存储器，和低于该阈值存储器。',
                    tags: ['文章标签1', '文章标签2'],
                    read: 10,
                    comments: 12
                }
            });
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
    var file = req.file;
    if (file) {
        console.log(req.file)
        console.log('文件类型：%s', file.mimetype);
        console.log('原始文件名：%s', file.originalname);
        console.log('文件大小：%s', file.size);
        console.log('文件保存路径：%s', file.path);
        res.json({
            isSuccess: 'true',
            path: 'http://' + req.headers.host + file.path.replace(/\\/g, "/").replace("public", "")
        });
    } else {
        res.json({
            isSuccess: 'false',
        })
    }
}

