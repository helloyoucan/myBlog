exports.index = function (req, res) {
    res.sendfile("./app/views/index.html");
}

//res.render('index', { title: 'Express' });