var fs = require('fs');
var filePath = "./public/Markdown/";
module.exports = {
    readMdSync: function (path) {      //同步读取
        try {
            var data = fs.readFileSync(path, 'utf-8');
            return data;
        } catch (e) {
            return "读取文章内容失败";
        }

    },
    readMd: function (path, callback) {          //异步执行
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err)
            }
            callback || callback();
        });
    },
    writeMd: function (article, callback) {    //异步方式
        var path = filePath + article.title + '-' + article._id + '.md';
        fs.writeFile(path, article.content, function (err) {
            if (err) {
                console.log(err)
            }
            callback || callback();
        });
        return path;
    },
    writeMdSync: function (article) {  //同步方式
        console.log(article.title)
        var path = filePath + article.title.replace(/ /g, "") + '-' + article._id + '.md';
        fs.writeFileSync(path, article.content);
        article.content = path;
        return path;
    },
}