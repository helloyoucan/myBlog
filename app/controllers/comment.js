var Comment = require('../models/comment');
exports.save = function (req, res) {
    console.log(req)
    var commentStr = req.body;
    console.log(commentStr);
    res.json({isSuccess: true})
}