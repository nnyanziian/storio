const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(mp3|wav|)$/)) {
        return cb(new Error('Only audio files are allowed!'), false);
    }
    cb(null, true);
};
module.exports = imageFilter;