/*
    用连接池连接数据库
*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookie = require('cookie');
const qs = require('querystring');
//用来读取cookie的
const cookieParser = require('cookie-parser');
//session 是基于 cookie生成的
const cookieSession = require('cookie-session');
const sessionOk = require('./sessionOk.js');
const cbFn = require('./cbFn.js')

let server = new express();

//用来解析content-tyoe = "www-form-urlencoded"
server.use(bodyParser.urlencoded({}))
//用来解析content-type = "application/json"
server.use(bodyParser.json({}))

   
server.listen(8084);
server.use(cookieParser('secret'));
//因为session不是独立存在的，是基于cookie的，所以仍然需要解析cookie的工具
//session是必须加入签名的，如果没加签名的话，系统会报错，告诉你Error:.required for signed cookies
(function(){
        let arr = [];
        for(let i = 0;i<10000;i++){
            arr.push('keys_'+Math.random());
        }
        server.use(cookieSession({
            keys:arr,//设置session密钥
            name:'user'//加密的cookie的名字,存储的是一个session_id,最后通过这个来在服务端查找到对应的人
        }))
        server.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1');
            res.header("Content-Type", "application/json;charset=utf-8");
            next();
         });
})();
let pool = mysql.createPool({
    //创建的最大连接数
    connectionLimit:10,
    //队列数量限制:在调用getConnection返回错误之前,连接池所允许入队列的最大请求数量
    queueLimit:1,
    //连接等待时间:当无连接可用或连接数达到上限的时候,判定连接池动作.如果为true,连接池将会请求加入队列,待可用之时再触发操作,如为false,连接池将立即返回错误(默认值:true)
    host:'localhost',
    user:'root',
    password:'191026',
    database:'weekly'
})
//注册接口
server.post('/weekly_war/user/register.do',cbFn.register(pool));
//登录接口
server.post('/weekly_war/user/login.do',cbFn.login(pool));

//session验证
// server.use(sessionOk());
//获取三周周报接口
server.use('/weekly_war/task/getTasks.do',cbFn.quick(pool));
//添加周报接口
server.use('/weekly_war/task/addTask.do',cbFn.addTask(pool))
//修改周报接口
server.use('/weekly_war/task/updateTask.do',cbFn.updateTask(pool))
//获取自己所有周报接口
server.use('/weekly_war/task/getAllTasksByUserId.do',cbFn.allTasks(pool))
//获取他人周报接口
server.use('/weekly_war/task/getAllTasks.do',cbFn.allOtherTasks(pool))
//删除周报接口
server.use('/weekly_war/task/deleteTask.do',cbFn.deleteTask(pool))
//退出接口
server.use('/weekly_war/user/logout.do',cbFn.logout())
//获取个人信息接口
server.use('/weekly_war/user/getUser.do',cbFn.getInfo(pool))
//修改个人信息接口
server.use('/weekly_war/user/updateUser.do',cbFn.modifyInfo(pool))
//修改密码接口
server.use('/weekly_war/user/updateUserPassword.do',cbFn.modifyPassword(pool))
//获取用户接口
server.use('/weekly_war/user/getAllUser.do',cbFn.getAllUser(pool))
//修改用户接口
server.use('/weekly_war/user/updateUserSim.do',
cbFn.updateUser(pool))
//删除用户接口
server.use('/weekly_war/user/deleteUser.do',cbFn.deleteUser(pool))