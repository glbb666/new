const express = require('express');
var server = express();

//cookie

server.use('/aaa',function(req,res){
    //名字:值 路径 过期时间(以毫秒为单位)这里设置为30天
    res.cookie('user','blue',{path:'/aaa/bbb',maxAge:30*24*3600*1000})
    res.send('ok')
})
server.listen(8080)
// 父亲可以访问孩子的cookie