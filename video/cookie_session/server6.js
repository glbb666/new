const express = require('express');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')


var server = express();


//cookie
server.use(cookieParser())
server.use(cookieSession({
    name:'sess',
    keys: ['aaa','bbb','ccc'],
    maxAge:24*3600*1000
}))
server.use('/',function(req,res){
    if(req.session['count']==null){
        req.session['count'] = 1;
    }else{
        req.session['count']++;
    }

    console.log(req.session['count'])

    res.send('ok')
})

server.listen(8080)

// cookie-session

// server.use(cookieParser())
// server.use(cookieSession(){
//     key:[]
// })

// server.use('/',function(req,res){
//     req.session
// })
// 1.cookie-存在浏览器,4k,不安全
// 签名加密
// 2.session-存在服务器
// 不能独立存在，基于cookie

server.use(cookieParser('签名字符串'))

//如果想使用session，基于cookie
server.use(cookieSession({
    //为了安全性，不可或缺
    keys:[]
}))
server.use(function(req,res){
    // res.secret = '签名字符串'，可以不给，在给cookieParser加签名字符串的同时，就会对res.secret进行默认赋值
    // res.cookie(名字，值,{signed:true})

    res.cookie['user']
    //删除cookie
    res.clearCookie('名字');

    //删除session:为什么能用delete，因为session是服务器上的东西
    res.session['xxx']
    // delete res.session
})