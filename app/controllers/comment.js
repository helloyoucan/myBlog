var Comment = require('../models/comment');
exports.save = function (req, res) {
    var commentStr = req.query;
    console.log(commentStr);
    res.json({isSuccess: true})
}