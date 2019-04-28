const express = require('express');
const bodyParser = require('body-parser');

var server = express();
server.listen(8080);

//多个use可以完成链式操作
server.use(bodyParser.urlencoded({
    extended:false,  //扩展模式
    limit:2*1024    //限制，默认100k
}));

server.use('/',function(req,res){
    console.log(req.body)//GET
})

//req.query GET
//req.body POST

//GET - 无需中间件
//req.query

//POST - 需要"body-parser"