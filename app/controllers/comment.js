var Comment = require('../models/comment');
exports.save = function (req, res) {
    var commentObj = req.body;
    console.log(commentObj);
    var comment = new Comment(commentObj);
    comment.save(function (err, comment) {
        if (err) {
            console.log(err);
            res.json({isSuccess: false, results: err});
        } else {
            res.json({isSuccess: true, results: comment})
        }
    })
}