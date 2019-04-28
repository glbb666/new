const express = require('express');
const cookieParser = require('cookie-parser')



var server = express();





server.use(cookieParser('dsgfdgfd'))

server.use('/aaa',function(req,res){
    //清除cookie
    res.clearCookie('user');

    res.send('ok')
})

server.listen(8080)