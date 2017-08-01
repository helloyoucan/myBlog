var Index = require('../app/controllers/index');
var Article = require('../app/controllers/article');
var Bookmarks = require('../app/controllers/bookmarks');
var Comment = require('../app/controllers/comment');
var User = require('../app/controllers/user');
var cors = require('cors');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.');
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
module.exports = function (app) {
    app.get('/', Index.index);
    app.get('/getPersonalDetails', Index.getDetail);
    app.post('/savePersonalDetails', User.signinRequired, cors(), Index.save);
    app.post('/uploadImg', upload.single('imageFile'), Index.uploadImg);
    app.post('/article/save', User.signinRequired, cors(), Article.save);
    app.post('/article/list', cors(), Article.list);
    app.post('/article/softDel', User.signinRequired, Article.softDel);
    app.post('/article/recycle/del', User.signinRequired, Article.del);
    app.get('/article/getById/:id', Article.getById);
    app.post('/article/getContent', Article.getContent);
    app.get('/article/:id', Article.article);
    app.post('/article/recycleBin', Article.recycleBin);
    app.post('/submitComment', Comment.save);
    app.post('/delComment', User.signinRequired, Comment.del);
    app.get('/bookmarks', Bookmarks.bookmarks);
    app.post('/saveUser', User.signinRequired, User.save);
    app.post('/signin', User.signin);
    app.get('/captcha', User.captcha);
    app.get('/logout', User.logout);
    app.get('/ba', function (req, res) {
        res.sendfile('./public/index.html');
    });
}