var Index = require('../app/controllers/index');
var Article = require('../app/controllers/article');
var Bookmarks = require('../app/controllers/bookmarks');
var cors = require('cors');
module.exports = function (app) {
    app.get('/', Index.index);
    app.get('/getPersonalDetails', Index.getDetail);
    app.post('/savePersonalDetails',cors(), Index.save);
    app.get('/article/:id', Article.article);
    app.get('/bookmarks', Bookmarks.bookmarks);
}