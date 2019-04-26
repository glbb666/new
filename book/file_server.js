'use strict'
var 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

//从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2]||'.');

console.log('Static root dir:'+root);

//创建服务器
var server = http.createServer(function(request,response){
    //获得URL的path,类似"/css/bootstrap.css"
     var pathname = url.parse(request.url).pathname;
     //获得对应的本地文件路径,类似'/srv/www/css/bootstrap.css';
     console.log('pathname:'+pathname);
     var filepath = path.join(root,pathname);
     //获取文件状态
     console.log('filepath:'+filepath);
     fs.stat(filepath,function(err,stats){
         if(!err&&stats.isFile()){
             //没有出错并且文件存在;
             console.log('200'+request.url);
             //发送200响应
             response.writeHead(200);
             //将文件流导向response
             fs.createReadStream(filepath).pipe(response)
         }else if(!err&&stats.isDirectory()){      //没有出错并且目录存在
            filepath = path.join(root,'/indexs.html')
            console.log('filepath:'+filepath)
            fs.stat(filepath,function(err,stats){
                if(!err&&stats.isFile()){
                      //没有出错并且文件存在;
                    console.log('200'+request.url);
                    //发送200响应
                    response.writeHead(200);
                    //将文件流导向response
                    fs.createReadStream(filepath).pipe(response)
                }else{
                    console.log('400'+request.url);
                    filepath = path.join(root,'/default.html')
                    console.log('filepath:'+filepath)
                    fs.stat(filepath,function(err,stats){
                        if(!err&&stats.isFile()){
                            //没有出错并且文件存在;
                            console.log('200'+request.url);
                            //发送200响应
                            response.writeHead(200);
                            //将文件流导向response
                            fs.createReadStream(filepath).pipe(response)
                        }else{
                              //出错了或者文件不存在
                            console.log('404'+request.url)
                            //发送404响应:
                            response.writeHead(404)
                            response.end('404 Not Found')
                        }
                    })
                }
            })
         }else{
             //出错了或者文件不存在
             console.log('404'+request.url)
             //发送404响应:
             response.writeHead(404)
             response.end('404 Not Found')
         }
     })
})
server.listen(8080)
console.log('Server is running at http://127.0.0.1:8080/')

//没有必要手动读取文件内容，由于response对象本身是一个Writable Stream,直接用pipe()方法就实现了自动读取文件内容并输出到HTTP响应

//在命令行运行node file_server.js /path/to/dir，把/path/to/dir改成你本地的一个有效的目录，然后在浏览器中输入http://localhost:8080/index.html
//eg: node file_server.js ../study
//就会在study目录下找相应的文件