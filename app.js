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
// var http = require('http');
// var server = http.createServer();
// server.on('request', function(req,res) { 
//     if(req.url!=="/favicon.ico"){
//       console.log(req.url);
//     }
//     res.end();
//   });
// server.on('customEvent',function(arg1,arg2,arg3){
//     console.log('自定义事件触发');
//     console.log(arg1);
//     console.log(arg2);
//     console.log(arg3);
// })
// server.emit('customEvent','a','b','c');
// server.listen(1337,'127.0.0.1');

// 获取指定事件的事件处理函数的数量
// var http = require('http');            // 
// var events = require('events');
// var server = http.createServer();
// server.on('request', function(req,res) {
//     if(req.url!=="/favicon.ico")
//       console.log('接收到客户端请求。');
//                   });
//     server.on('request', function(req,res) { 
//       if(req.url!=="/favicon.ico"){
//         console.log(req.url);
//       }
//       res.end();
//     });
//     server.on('request', function(req,res) {
//       if(req.url!=="/favicon.ico")
//         console.log('发送响应完毕。');
//                     });
// server.listen(1337, "127.0.0.1");
// console.log(events.EventEmitter.listenerCount(server,'request'));

// 监听newListener事件及removeListener事件
// var http = require('http');            

// var server = http.createServer();      

// server.on('removeListener',function(e,f){
//   console.log(" 对"+e+" 事件取消事件处理函数");
//               console.log(f);
// });
// server.on('newListener',function(e,f){
//   console.log(" 对"+e+" 事件添加事件处理函数");
//               console.log(f);
// });
// var testFunction=function(req,res) {
//   if(req.url!=="/favicon.ico")
//     console.log('发送响应完毕。');
//     };
// server.on('request', function(req,res) {
//     if(req.url!=="/favicon.ico")
//     console.log('接收到客户端请求。');
//                 });
// server.on('request', function(req,res) { 
//     if(req.url!=="/favicon.ico"){
//         console.log(req.url);
//     }
//         res.end();
//       });
// server.on('request',testFunction);
// server.removeListener('request',testFunction);
// server.listen(1337, "127.0.0.1");

//事件调试
console.log('hello, world');
function foo() {
  console.log('hello, foo');
  return 100;
}
var bar = 'This is a pen.';
var http = require('http');
var i = foo();
console.log(i);