const express = require('express');
const cookieParser = require('cookie-parser')
var server = express();

//cookie
// 1.读取——cookie-parser
// 2.发送——
server.use(cookieParser())

server.use('/aaa',function(req,res){
    // console.log(req.cookies)
    req.secret = 'dsgfdgfd'
    res.cookie('user','blue')
    res.send('ok')
})

server.listen(8080)