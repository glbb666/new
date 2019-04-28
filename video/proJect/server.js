const express = require('express')
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const jade = require('jade')

var server = express();
server.listen(8080)



//1.解析cookie
server.use(cookieParser());

//2.使用session

//3.post数据

//4.static数据