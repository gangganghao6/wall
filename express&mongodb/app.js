const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const cors = require('cors')
const formidable = require('express-formidable')
const mongoose = require('mongoose')
const {internet,location}=require('./locationConfig')
const mongodbUtil=require('./utils/mongodbUtil')

let userRouter = require('./routes/user.js');
let wallRouter = require('./routes/wall');
let newThingRouter=require('./routes/newThing')
let loginCheckRouter=require("./routes/loginCheck")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my key',//配置加密字符串,他会在原有加密基础上凭据上自己定义的字符串加密信息，防止客户端恶意伪造
    resave: false,
    saveUninitialized: false,//强制将为初始化的session 储存，无论是否使用session 都默认分配一个秘钥
    cookie : { httpOnly: true }
}))
app.use('/api', cors());
app.use('/api/user/headerchange',formidable({
    encoding: 'utf-8',
    uploadDir: location,
    multiples: true,
    keepExtensions: false,
}));
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", internet);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
})
// app.use('*',loginCheckRouter)
app.use('/api/user', userRouter);
app.use('/api/wall', wallRouter);
app.use('/api/newthing',newThingRouter);

mongodbUtil.loadMongodb();
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
});
// module.exports = app;
