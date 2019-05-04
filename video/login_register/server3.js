//引入express框架
const express = require('express');
//用来转换post的信息的
const bodyParser = require('body-parser');
const fs = require('fs');
const urlLib = require('url');
const cookie = require('cookie');
const cookieSession  = require('cookie-session');


var user = {};



//使用express框架创建服务器
var server = new express();
//使用bodyParser,解析post上来的数据
server.use(bodyParser.urlencoded({}))

//use可以接收/user接口到无论是get还是post的请求
//
server.use('/',function(req,res){
    // console.log(req.body);
    // console.log(req.url)
    console.log(req.body)
    var GET = req.query;
    var POST = req.body;
    let url = urlLib.parse(req.url,true)
    // console.log(url)
    //当是接口的时候
    req.on('end',function(){
        var obj = urlLib.parse(req.url,true);        
        const url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse(str);
        //区分——接口、文件
        if(url=='/user'){   //接口
            switch(GET.act){
                case 'reg':
                  //1.检查用户名是否已经有了
                    if(users[GET.user]){
                        res.write('{"ok":false,"msg":"此用户已存在"}')
                    }else{
                        //2.插入users
                        users[GET.user] = GET.pass;
                        res.write('{"ok":true,"msg":"注册成功"}')
                    }
                   break;
                case 'login':
                //1.检查用户是否存在
                if(users[GET.user]==null){
                    res.write('{"ok":false,"msg":"此用户不存在"}');
                }else if(users[GET.user]!=GET.pass){
                    res.write('{"ok":false,"msg":"用户名或密码有误"}');
                }else{
                    res.write('{"ok":true,"msg":"登录成功"}');
                }
                break;
                default:
                    res.write('{"ok":false,"msg":"未知的act"}')
            }
            res.end();
        }else{  //文件
         //读取文件
            var file_name = './www'+url;
            fs.readFile(file_name,function(err,data){
                if(err){
                    res.write('404')
                }else{
                    res.write(data)
                }
                res.end();
            })
            }
        })
})
// server.use('/user',function(req,res){

// })

server.listen(8080);