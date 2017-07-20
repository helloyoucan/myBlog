var Comment = require('../models/comment');
exports.save = function (req, res) {
    var commentObj = req.body;
    commentObj.content = commentObj.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
exports.del = function (req, res) {
    var id = req.body.id;
    if (id.length) {
        Comment.remove({"_id": id}, function (err, results) {
                if (err) {
                    res.json({isSuccess: false, results: err});
                } else {
                    res.json({isSuccess: true, results: results});
                }
            }
        )
    }
}