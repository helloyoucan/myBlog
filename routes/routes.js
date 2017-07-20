var Index = require('../app/controllers/index');
var Article = require('../app/controllers/article');
var Bookmarks = require('../app/controllers/bookmarks');
var Comment = require('../app/controllers/comment');
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
    app.post('/savePersonalDetails', cors(), Index.save);
    app.post('/uploadImg', upload.single('imageFile'), Index.uploadImg);
    app.post('/article/save', cors(), Article.save);
    app.post('/article/list', cors(), Article.list);
    app.post('/article/softDel', Article.softDel);
    app.post('/article/recycle/del', Article.del);
    app.get('/article/getById/:id', Article.getById);
    app.post('/article/getContent', Article.getContent);
    app.get('/article/:id', Article.article);
    app.post('/article/recycleBin', Article.recycleBin);
    app.post('/submitComment', Comment.save);
    app.post('/delComment', Comment.del);
    app.get('/bookmarks', Bookmarks.bookmarks);
}