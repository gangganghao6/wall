var express = require('express');
const mongooseUtil = require("./../utils/mongodbUtil");
var router = express.Router();

/* GET users listing. */
router.get('/get', async function (req, res, next) {
    let page = req.query.page;
    let result = await mongooseUtil.getWall(page)
    res.json({status: 'success', data: result})
});

module.exports = router;
