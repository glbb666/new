const express = require('express');

var server = express();


var routeUser = express.Router();

//目录1:/user/
routeUser.get('/1.html',function(req,res){
    res.send('user1')
})
routeUser.get('/2.html',function(req,res){
    res.send('user222222222222')
})
//把目录添加到服务器身上
server.use('/user',routeUser)

//目录2:/article
var articleRouter = express.Router();
server.use('/article',articleRouter);
articleRouter.get('/10001.html',function(req,res){
    res.send('sdafds')
})


server.listen(8080)

