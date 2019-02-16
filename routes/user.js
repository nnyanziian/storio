const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const Imageutils = require('../util/images');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/',fileFilter: Imageutils.imageFilter })


router.get('/', function (req, res) {
    res.json({
     msg:"STORIO API Service Gateway",
     Resources:["Users", "Stories"],
    });
 });
 

// users
router.put('/user/:id', function (req, res) {
    user.update(req, res);
});
router.delete('/user/:id', function (req, res) {
    user.delete(req, res);
});


module.exports = router;
