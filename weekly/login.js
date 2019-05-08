const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var server = new express();
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'191026',
    database:'weekly'
})
connection.connect();
//登录接口
server.use(bodyParser.urlencoded({}))
server.listen(8081);
server.post('/weekly_war/user/register.do',function(req,res){
    console.log("注册:");
    console.log(req.body);
    var user = req.body;
    // 注册成功需要满足以下条件
    // 1.用户名的长度符合要求
    // 2.密码的长度符合要求
    // 3.用户名在数据库中不存在
    
    //在数据库中创建一个user表，保存注册的用户信息
    //当要新添入用户的时候，就查看user表，如果有相同的用户名，那么注册成功，否则注册失败。
    var addSql = "INSERT INTO user(weekly_id,weekly_email,weekly_password,weekly_phone) VALUES(0,?,?,?)";
    var addSqlParams = [user.email,user.password,user.phone];
    //增
    connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            res.write('{"ok":false,"msg":"此用户已存在"}')
            return;
        }
        // console.log('INSERT ID:',result.insertId);
        res.write('{"ok":true,"msg":"注册成功"}')
    });
    // connection.end();
})
server.post('/weekly_war/user/login.do',function(req,res){
    console.log("登录:");
    console.log(req.body);
})