/*
    此处是用原生的代码连接数据库
*/
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

// handleDisconnect(connection);
//登录接口
server.use(bodyParser.urlencoded({}))
server.listen(8082);
server.post('/weekly_war/user/register.do',function(req,res){
    console.log("注册:");
    console.log(req.body);
    var user = req.body;
    var data;
    // 注册成功需要满足以下条件
    // 1.用户名不能为空
    if(!user.email){
        data = {
            msg:"参数为空",
            code:1003,
            success:false
        };
        res.write(JSON.stringify(data));
        res.end();
    }else if(user.password.length<4||user.password.length>18){
     // 2.密码的长度符合要求
       data = {
                msg:"注册失败,密码长度不对!",
                code:1004,
                success:false
            };
            res.write(JSON.stringify(data));
            res.end();
    }else{
    // 3.用户名在数据库中不存在
    //在数据库中创建一个user表，保存注册的用户信息
    //当要新添入用户的时候，就查看user表，如果有相同的用户名，那么注册成功，否则注册失败。
    connection = mysql.createConnection(connection.config);
    connection.connect();
    var addSql = "INSERT INTO user(weekly_id,weekly_email,weekly_password,weekly_phone) VALUES(0,?,?,?)";
    var addSqlParams = [user.email,user.password,user.phone];
    //增加成员
    connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            data = {
                msg:"注册失败,用户名已存在",
                code:4000,
                success:false
            }
            res.write(JSON.stringify(data));
        }else{   
            data = {
                msg:"注册成功",
                code:2000,
                success:true,
                user:{
                    //id要从数据库中获取
                    "id":result.insertId,
                    "email":null,
                    "password":null,
                }
            }
            res.write(JSON.stringify(data));
            //注册成功,再终止数据库的连接
            // connection.end();
            // console.log('INSERT ID:',result.insertId);
        }
        res.end();
        });
        // connection.end();
    }
    //结束响应
});
// server.post('/weekly_war/user/login.do',function(req,res){
//     console.log("登录:");
//     console.log(req.body);
// })


function handleDisconnect(connection) {
    //监听错误事件
    connection.on('error', function(err) {
      if (!err.fatal) {
        return;
      }
   
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      }
   
      console.log('Re-connecting lost connection: ' + err.stack);
   
      connection = mysql.createConnection(connection.config);
      handleDisconnect(connection);
      connection.connect();
    });
  }
