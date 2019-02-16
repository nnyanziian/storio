const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const Imageutils = require('../util/images');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/',fileFilter: Imageutils.imageFilter });



//Register users
router.post('/user', function (req, res, next) {
    user.register(req, res, next);
});
router.post('/upload',upload.single('audio'), function (req, res, next) {
    user.returnUploaded(req, res, next);
});

router.post('/user/login', function (req, res) {
    user.login(req, res);
});
router.post('/users/search', function (req, res) {
    user.search(req, res);
});
router.get('/verify/user', function (req, res) {
    user.verifyAfterLogin(req, res);
});
router.get('/user/:id', function (req, res) {
    user.getById(req, res);
});
module.exports = router;

