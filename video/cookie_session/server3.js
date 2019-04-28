const express = require('express');
const cookieParser = require('cookie-parser')
var server = express();

//cookie
// 1.读取
//cookie-parser
//server.use(cookieParser('密钥'))

// 2.发送
//res.secret = '字符串'
//cookie(名字,值,{path:'/',maxAge:毫秒,signed})

// server.use(function(){
//     req.cookie      未签名版
//     req.signedCookies       签名版
// })

//  3.删除
// res.clearCookie('名字')
server.use(cookieParser('dsgfdgfd'))

server.use('/aaa',function(req,res){
    // console.log(req.cookies)
    req.secret = 'dsgfdgfd'
    res.cookie('user','blue',{signed:true})

    console.log('签名cookie:',req.signedCookies)
    console.log('无签名cookie:',req.cookies)
    
    res.send('ok')
})

server.listen(8080)