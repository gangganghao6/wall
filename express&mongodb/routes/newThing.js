var express = require('express');
var router = express.Router();
let mongooseUtil = require('./../utils/mongodbUtil')


/* GET users listing. */
router.get('/get', async function (req, res, next) {
    let page = req.query.page;
    let result = await mongooseUtil.getNewThing(page)
    res.json({status: 'success', data: result})
});

module.exports = router;
