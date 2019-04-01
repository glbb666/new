'use strict'

// 使用http对象来导入http模块
var http = require('http');
var server = http.createServer(function(request,response){
    //回调函数接受request(客户端请求对象)和response(服务器端响应对象)
    //获得http请求的method和url:
    console.log(request.method+":"+request.url);
    //通过响应对象的writeHead方法书写响应头，同时将响应头中的状态码定义为200，将内容类型Content-Type定义为text/html,表示返回一段HTML代码,代码如下所示
    response.writeHead(200,{'Content-Type':'text/html'});
    //然后通过响应对象的write方法书写一行HTML代码，在本例中书写一个<head>标签，并在<head>标签中通过meta属性将HTML网页所使用的字符集定义为UTF-8字符集，目的是为了能够在浏览器中显示中文，代码如下所示：
    response.write('<head><meta charset="utf-8"/></head>');
    //将HTTP响应的HTML内容写入response
    response.end('<h1>Hello world!</h1>')
});
//http模块的createServer方法将返回被创建的http服务器对象，我们使用该对象的listen方法指定该服务器使用端口及服务器绑定地址，并对该端口进行监听
server.listen(1337,"127.0.0.1");
console.log('Server is running at http://127.0.0.1:1337/')

