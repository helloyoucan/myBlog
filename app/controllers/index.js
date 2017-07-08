exports.index = function (req, res) {
   //res.sendfile("./app/views/index.html");
    //res.render('index.jade', { title: 'Express' });
    res.render('index', { //第一个参数为views里面的视图文件,第二个数据为传给视图文件的变量的值
        title: 'imooc 首页',
        categories: categories
    });
}
//获取个人信息
var PersonalDetails = require('../models/personalDetails')
exports.getPersonalDetails = function (req, res) {
    /*PersonalDetails.fetch(function (err, message) {
     if (err) {
     console.log(err);
     } else {
     res.json(message)
     }
     });*/
    var test = {
        iconUrl: "img/head-icon.jpg",
        name: "helloyoucan",
        emial: ["helloyoucan@163.com", "helloyoucan520@gmail.com"],
        github: {name: 'Github', url: 'https://github.com/helloyoucan', iconUrl: 'img/github.png'},
        other: [{name: '简书', url: 'http://www.jianshu.com/u/9207c99d25fc', iconUrl: 'img/jianshu.jpg'}],
    };

    res.json(test)
}

