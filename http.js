// 'use strict'

// // 使用http对象来导入http模块
// var http = require('http');
// var server = http.createServer(function(request,response){
//     //回调函数接受request(客户端请求对象)和response(服务器端响应对象)
//     //获得http请求的method和url:
//     console.log(request.method+":"+request.url);
//     //通过响应对象的writeHead方法书写响应头，同时将响应头中的状态码定义为200，将内容类型Content-Type定义为text/html,表示返回一段HTML代码,代码如下所示
//     response.writeHead(200,{'Content-Type':'text/html'});
//     //然后通过响应对象的write方法书写一行HTML代码，在本例中书写一个<head>标签，并在<head>标签中通过meta属性将HTML网页所使用的字符集定义为UTF-8字符集，目的是为了能够在浏览器中显示中文，代码如下所示：
//     response.write('<head><meta charset="utf-8"/></head>');
//     //将HTTP响应的HTML内容写入response
//     response.end('<h1>Hello world!</h1>')
// });
// //http模块的createServer方法将返回被创建的http服务器对象，我们使用该对象的listen方法指定该服务器使用端口及服务器绑定地址，并对该端口进行监听
// server.listen(1337,"127.0.0.1");
// console.log('Server is running at http://127.0.0.1:1337/')

//创建http服务器
// var http = require('http');
// var server = http.createServer(function(req,res){
//     res.end()
//     //暂不指定接收到客户端请求时的处理
// }).listen(1337,'127.0.0.1');
// server.on('connection',function(socket){
//     console.log('客户端连接已经建立')
// })
// // 使用setTimeout设置服务器超时时间
// server.setTimeout(60*1000,function(){
//     console.log('服务器超时')
//     // console.log(socket)
//     console.log(server.timeout)
// })

//在文件中保存客户端请求信息
// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(function(req,res){
//     if(req.url!=='/favicon.ico'){
//         var out = fs.createWriteStream('./request.log')
//         out.write('客户端所用方法为:'+req.method+'\r\n');
//         out.write('客户端请求所用url字符串为:'+req.url+'\r\n');
//         out.write('客户端请求头对象为:'+JSON.stringify(req.headers)+'\r\n')
//         out.end('客户端请求所用http版本为'+req.httpVersion)
//     }
//     res.end()
// }).listen(1337,'127.0.0.1')

// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(function(req,res){
//     if(req.url!=='/favicon.ico'){
//         req.on('data',function(data){
//              console.log('服务器接收到数据:'+decodeURIComponent(data));
//         });
//        req.on('end',function(){
//            console.log('客户端请求已全部接收完毕')
//        })
//     }
//     res.end();
// }).listen(1337,'127.0.0.1')

//转换url字符串与查询字符串
//利用parse方法解析url地址字符串
// var http = require('http'),
//     url = require('url');
// var server = http.createServer().listen(1337,'localhost');
// server.on('request',function(req,res){
//     if(req.url!=='/favicon.ico'){
//         res.write('<html><head><meta charset="utf-8"/></head>');
//         var url_parts = url.parse(req.url);
//         switch(url_parts.pathname){
//             case '/':
//             case '/index.html':
//                 res.write('<body>您当前正在访问网站首页</body></html>')
//                 break; 
//             default:
//                 res.write('<body>您当前正在访问:'+url_parts.pathname+".</body></html>");    
//         }
//     }
//     res.end();
// })

//发送服务器端响应流

// var http = require('http');

// var server = http.createServer(function(req,res){
//     if(req.url!=='/favicon.ico'){
//         //因为用文件打开，所以源是null
//         //用读文件的方式打开，源才是正确的
//         // console.log(req.headers)
        
//         res.writeHead(200,{'Content-Type':'text/plain',
//         'Access-Control-Allow-Origin':'null'
//         // 'Access-Control-Allow-Origin':'*'
//     });
//         res.write('你好');
//     }
//     res.end();
// }).listen(1337,'localhost');

//用setHeader设置多个响应字段

// var http = require('http');

// var server = http.createServer(function(req,res){
//     if(req.url!=='/favicon.ico'){
//         //因为用文件打开，所以源是null
//         //用读文件的方式打开，源才是正确的
//         // console.log(req.headers)
        
//     //     res.writeHead(200,{'Content-Type':'text/plain',
//     //     // 'Access-Control-Allow-Origin':'null'
//     //     // 'Access-Control-Allow-Origin':'*'
//     // });
//         res.setHeader('Content-Type','text/plain');
//         // res.setHeader('Access-Control-Allow-Origin',"http://localhost");
//         res.setHeader('Access-Control-Allow-Origin',null);
//         // res.removeHeader('Access-Control-Allow-Origin')
//         res.write('你好');
//         console.log(res.getHeader('Content-Type'))
//     }
//     res.end();
// }).listen(1337,'localhost');

//使用headersSent属性查看使用writeHead方法时响应头的发送实际
var http = require('http');
var server = http.createServer(function(req,res){
    if(req.url!=='/favicon.ico'){
        if(res.headersSent) console.log('响应头已发送');
        else console.log('响应头未发送')

        res.writeHead(200,{'Content-Type':'text/html'})
        
        if(res.headersSent) console.log('响应头已发送')
        else console.log('响应头未发送')
        
        res.write('<html><head><meta charset="uft-8"/></head>')
        res.write('你好')
    }
    res.end();
}).listen(1337,'localhost')