var Index = require('../app/controllers/index');
var Article = require('../app/controllers/article');
var Bookmarks = require('../app/controllers/bookmarks');
module.exports = function(app) {
    app.get('/', Index.index);
    app.get('/article', Article.article);
    app.get('/bookmarks', Bookmarks.bookmarks);
}