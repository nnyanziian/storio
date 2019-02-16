const express = require('express');
const router = express.Router();

//Root Api
router.get('/', function (req, res) {
    res.json({
        msg:"STORIO API Service Gateway",
        Resources:["Users", "Stories"],
        api_doc:"https://documenter.getpostman.com/view/666460/S11ByMoT",
        repository:"https://github.com/nnyanziian/storio"
       });
});

module.exports = router;

