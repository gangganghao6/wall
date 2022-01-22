let express = require('express');
const fs = require("fs");
let router = express.Router();
let userData = require('./../public/data/userData.js')
const {location} = require('./../locationConfig')
let mongodbUtil = require('./../utils/mongodbUtil')


router.post('/headerchange', function (req, res) {
    let phone = req.query.phone;
    fs.rename(req.files.file.path, location + phone + '.png', (err) => {
    })//req.files.file.name
    res.send({status: 'success', response: '/images/' + phone + '.png'});
})
router.post('/login', async function (req, res) {
    console.log(req.body)
    let {phone, password} = req.body;
    let result = await mongodbUtil.checkUserPassword(phone, password);
    console.log(result)
    res.json(result);
})
router.post('/register', async function (req, res) {
    let {name, phone, password, age, sex} = req.body;
    let result = await mongodbUtil.addUser({name, phone, password, sex, age})
    res.json(result)
})
router.post('/publish', async function (req, res) {
    let {title, content, type, user: {phone, name}} = req.body;
    if (type === 'newThing') {
        await mongodbUtil.addNewThing(phone, name, title, content)
    } else {
        await mongodbUtil.addWall(phone, name, title, content)
    }
    res.json({status: 'success', data: null});
})
router.post('/like', async function (req, res) {
    let {id, user: {phone}, type} = req.body;
    if (type === 'newThing') {
        let result = await mongodbUtil.addNewThingLike(id, phone);
        res.json(result)
    } else {
        let result = await mongodbUtil.addWallLike(id, phone);
        res.json(result)
    }

})
router.post('/cancelLike', async function (req, res) {
    let {id, user: {phone}, type} = req.body;
    if (type === 'newThing') {
        let result = await mongodbUtil.cancelNewThingLike(id, phone);
        res.json(result)
    } else {
        let result = await mongodbUtil.addWallLike(id, phone);
        res.json(result)
    }
})

router.get('/getUserInfo', async function (req, res) {
    let phone = req.query.phone;
    let result = await mongodbUtil.findUser(phone);
    res.json(result);
})
router.post('/changeInfo', async function (req, res) {
    let {type, data, phone} = req.body;
    let msg = '';
    switch (type) {
        case '姓名':
            msg = 'name';
            break;
        case'年龄':
            msg = 'age';
            break;
        case'性别':
            msg = 'sex';
            break;
        case'密码':
            msg = 'password';
            break;
    }
    let user = {
        [`${msg}`]: data
    }
    let result = await mongodbUtil.changeUserMessage(phone, user);
    res.json(result)
})
router.post('/deletePublish', async function (req, res) {
    let {id, phone, type} = req.body;
    if(type==='newthing'){
        await mongodbUtil.deleteNewThing(id,phone)
    }else{
        await mongodbUtil.deleteWall(id,phone)
    }
    res.json({})
})
module.exports = router;
