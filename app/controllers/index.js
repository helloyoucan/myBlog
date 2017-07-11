var PersonalDetails = require('../models/personalDetails');
var fs = require('fs');
var path = require('path');
exports.index = function (req, res) {
    res.render('index', {
        title: 'helloyoucan个人博客',
        message: {
            iconUrl: "img/head-icon.jpg",
            name: "helloyoucan",
            emial: ["helloyoucan@163.com", "helloyoucan520@gmail.com"],
            github: {name: 'Github', url: 'https://github.com/helloyoucan', iconUrl: 'img/github.png'},
            other: [{name: '简书', url: 'http://www.jianshu.com/u/9207c99d25fc', iconUrl: 'img/jianshu.jpg'}],
        },
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
//获取个人信息
exports.getDetail = function (req, res) {
    PersonalDetails.find({}, function (err, message) {
        if (err) {
            console.log(err);
        } else {
            console.log(message)
            res.json(message)
        }
    });
    /*var test = {
     iconUrl: "img/head-icon.jpg",
     name: "helloyoucan",
     emial: ["helloyoucan@163.com", "helloyoucan520@gmail.com"],
     github: {name: 'Github', url: 'https://github.com/helloyoucan', iconUrl: 'img/github.png'},
     other: [{name: '简书', url: 'http://www.jianshu.com/u/9207c99d25fc', iconUrl: 'img/jianshu.jpg'}],
     };*/
    res.json(test)
}
exports.save = function (req, res) {
    console.log(req)
    /*PersonalDetails.update({}, function (err, message) {
     if (err) {
     console.log(err);
     } else {
     console.log(message);
     }
     })*/
}
exports.uploadImg = function (req, res) {
    var file = req.file;
    console.log(req.file)
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({
        isSuccess: 'false',
        path: 'http://' + req.headers.host  + file.path.replace(/\\/g, "/").replace("public", "")
    });
}

