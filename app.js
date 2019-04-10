// console.log(
//     "This is a test string."
//     );
// console.time('small loop');    
// // console.error("This is anerror string.");
// console.warn("this is a warn");
// for(i = 0;i<100000;i++){
//     ;
// }
// console.timeEnd('small loop');
// // console.trace('trace');
// console.assert(1==false,'error');
// var testModule = require('./testModule.js');
// if(module === require.main) {
//     console.log('This is the main module of application.');
//   }
// require.resolve('./testModule.js')
// var testModule1=require('./testModule.js');
// var testModule2=require('./testModule.js');
// delete require.cache[require.resolve('./testModule.js')];
// var testModule3=require('./testModule.js');
// var testModule1=require('./test/testModule.js');
// var http = require('http');
// var server = http.createServer();
//创建http服务器并赋值给server变量
// server.on('request',function(req,res){
//     console.log('接收到请求')
// })
// server.on('request',function(req,res){
//     console.log(req.url)
//     res.end()
// })
// server.on('request',function(req,res){
//     console.log('请求完毕')
// })
// server.listen(1337,'127.0.0.1')
// console.log(server.listeners('request'))
// server.once('request',function(req,res){
//     console.log('接收到请求')
// })
// server.on('request',function(req,res){
//     if(req.url!='/favicon.ico'){
//         console.log(req.url)
//     }
//     res.end()
// })
// server.once('request',function(req,res){
//     console.log('请求完毕')
// })
// server.listen(1337,'127.0.0.1')
// console.log(server.listeners('request'))
// var http = require('http');          
// var server = http.createServer();      
// var testFunction=function(req,res) {
//   if(req.url!=="/favicon.ico")
//     console.log(' 发送响应完毕。');
//        };
             
// server.on('request', function(req,res) {
//     if(req.url!=="/favicon.ico")
//         console.log('接收到客户端请求。');
//        });
// server.on('request', function(req,res) { 
//     if(req.url!=="/favicon.ico"){
//           console.log(req.url);
//         }
//         res.end();
//       });
// server.on('request',testFunction);
// // server.removeListener('request',testFunction);
// server.removeAllListeners('request');
// server.listen(1337, "127.0.0.1");

//自定义事件并将其触发
var http = require('http');
var server = http.createServer();
server.on('request', function(req,res) { 
    if(req.url!=="/favicon.ico"){
      console.log(req.url);
    }
    res.end();
  });
server.on('customEvent',function(arg1,arg2,arg3){
    console.log('自定义事件触发');
    console.log(arg1);
    console.log(arg2);
    console.log(arg3);
})
server.emit('customEvent','a','b','c');
server.listen(1337,'127.0.0.1');