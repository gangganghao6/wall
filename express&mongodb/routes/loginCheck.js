const express = require("express");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    next();
});

module.exports = router;
