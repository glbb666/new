// const express=  require('express');
// var server = express();

// server.use('/a.html',function(req,res){
//     // res.send({a:'asds'});
//     // res.write({a:'sdas'})
//     res.end();
// })
// server.use('/b.html',function(req,res){
//     res.send('123');
//     res.end();
// })
// server.listen(8080);


//非侵入式
// req

// 原生

//buffer 和 string
// res.write()
// res.end()

//可以发送json
// res.send()

// express保留了原生的功能，添加了一些方法，增强原有的功能

//三个步骤
//1.创建服务
// var server = express()
//2.监听
//server.listen(8080)
//3.处理请求地址
//server.use('地址',function(req,res){
//})


//三种方法
// var express = require('express');
// var server = express();
// // server.get('/',function(req,res){
// //     console.log('get了')
// // })
// server.post('/',function(req,res){
//     console.log('post了')
// })
// // server.use('/',function(){
// //     console.log('use了')
// // })
// server.listen(8080);

