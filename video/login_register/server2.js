//引入express框架
const express = require('express');
//用来转换post的信息的
const bodyParser = require('body-parser');
const fs = require('fs');
const urlLib = require('url');
const cookie = require('cookie');

//用来读取cookie的
const cookieParser = require('cookie-parser');
//session 是基于 cookie生成的
const cookieSession  = require('cookie-session');

var user = {};



//使用express框架创建服务器
var server = new express();
//使用bodyParser,解析post上来的数据
server.use(bodyParser.urlencoded({}))
server.listen(8080);
//use可以接收/user接口到无论是get还是post的请求

server.use(cookieParser('aass'));
(
    function(){
        var arr= [];
        for(var i = 0;i<10000;i++){
            arr.push('keys_'+Math.random());
        }
        server.use(cookieSession({
            keys:arr,
            name:'test1'//加密的cookie的名字,最后通过这个来从服务端查找到对应的人
        }))
})();
server.use('/',function(req,res){
    // console.log(req.body);
    // console.log(req.url)
   
    var GET = req.query;
    var POST = req.body;
    let url = urlLib.parse(req.url,true)
    // console.log(url)
    //当是接口的时候
    
    if(url.pathname=='/user'){
        console.log('是接口')
        // console.log(user)
        // JSON的键必须用双引号包裹
        switch(POST.act){
            case 'reg':
                //检查用户名是否存在，如果存在报错，如果不存在插入数据
                if(user[POST.user]){
                    // console.log('注册失败');
                    res.write('{"ok":false,"msg":"此用户名已存在"}');
                    // res.write('{"ok":false,"msg":"此用户已存在"}')

                }else{
                    // console.log('注册成功')
                    user[POST.user] = POST.pass;
                    res.write('{"ok":true,"msg":"注册成功"}');
                }
                break;
            case 'login':
                if(user[POST.user]==null){
                    res.write('{"ok":false,"msg":"此用户不存在"}');
                }else if(user[POST.user]!=POST.pass){
                    res.write('{"ok":false,"msg":"用户名或密码有误"}');
                }else{
                    // req.secret = 'aass'
                    // res.cookie('user',POST.user,{
                    //     //cookie只能向上访问
                    //     //如果这里的路径是/index.html是获取不到user的
                    //     path:'/',
                    //     maxAge:30*24*3600*1000,
                    //     signed:true
                    // })
                    // console.log('签名cookie:',req.signedCookies)
                    // console.log('无签名cookie:',req.cookies)
                    // console.log(req.session['test']);
                   
                    if(typeof req.session['test'] == 'undefined'){
                        req.session['test'] = 'xixi';
                        // res.send('这是第一次访问');
                        res.write('{"ok":true,"msg":"登录成功,这是第一次访问"}');
                        console.log('这是第一次访问')
                    }else{
                        // res.send('这不是第一次访问');
                        res.write('{"ok":true,"msg":"登录成功,这不是第一次访问"}');
                        console.log('这不是第一次访问')
                    }
                    // res.write('{"ok":true,"msg":"登录成功"}');

                }
                break;
            default:
                res.write('{"ok":false,"msg":"未知的act"}')
            }
        res.end();
    }else{
        //当是文件的时候
        // console.log('是文件');
        var file_name = './www'+req.url;
        fs.readFile(file_name,function(err,data){
            if(err){
                res.write('404');
            }else{
                res.write(data);
            }
            res.end();
        })
    }
})

