const express = require('express');
var server = express();

//cookie
server.use('/',function(req,res){
    //名字:值
    res.cookie('user','blue',{path:'/aaa',maxAge:30*24*3600*1000})
    res.send('ok')
})
server.listen(8080)