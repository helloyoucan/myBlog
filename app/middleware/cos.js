var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    AppId: '1252517012',
    SecretId: 'AKID1pRntjZejY7QimlBbnkSv98sNcdPaAAy',
    SecretKey: 'g7JFv0wfR3TfiYCconZ7RYkmbCbCZhYA',
});
var Bucket = 'myblog',
    Region = 'cn-south';
exports.put = function (opt) {
    /*
     * opt{
     * key, content, success, error}
     * */
    var bufferContent = new Buffer(opt.content);
    cos.putObject({
        Bucket: Bucket,
        Region: Region,
        Key: opt.key,
        Body: bufferContent,
    }, function (err, data) {
        if (err) {
            opt.error(err);
        } else {
            opt.success(data);
        }
    });
};
exports.get = function (opt) {
    /***
     * opt:{
     * key, success, error
     * }
     */
    cos.getObject({
        Bucket: Bucket,
        Region: Region,
        Key: opt.key,
    }, function (err, data) {
        if (err) {
            opt.error(err);
        } else {
            opt.success(data.Body.toString());
        }
    });
};
exports.dels = function (opt) {
    /**
     * opt:{
     * keys, success, error
     * }
     * */
    cos.deleteMultipleObject({
        Bucket: Bucket,
        Region: Region,
        Objects: opt.keys,
        /*Objects: [{Key: 'STRING_VALUE'}]*/
    }, function (err, data) {
        if (err) {
            opt.error(err);
        } else {
            opt.success(data);
        }
    });
};

