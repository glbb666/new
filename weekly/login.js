/*
    用连接池连接数据库
*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookie = require('cookie');

//用来读取cookie的
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

let server = new express();
server.listen(8084);

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
server.use(bodyParser.urlencoded({}))
server.post('/weekly_war/user/register.do',function(req,res){
    console.log("注册:");
    console.log(req.body);
    let user = req.body;
    let data;
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
    //直接使用连接池
    let addSql = "INSERT INTO user(weekly_id,weekly_email,weekly_password,weekly_phone) VALUES(0,?,?,?)";
    let addSqlParams = [user.email,user.password,user.phone];
    //增加成员
    pool.query(addSql,addSqlParams,function(err,result){
        if(err){
            if(err.code==='ER_DUP_ENTRY'){
                data = {
                    msg:"注册失败,用户名已存在",
                    code:4000,
                    success:false
                }
            }else{
                data = {
                    msg:"未知错误",
                    code:5000,
                    success:false
                }
            }
            res.write(JSON.stringify(data));
        }else{
            console.log(result);  
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
server.post('/weekly_war/user/login.do',function(req,res){
    console.log("登录:");
    console.log(req.body);
    //当登陆的时候,调取数据库中user表的内容,如果表中的内容存在,那么说明这个用户已经注册过了,那么我们就验证用户输入的密码和数据库中的密码是否匹配,如果匹配的话,那么就让用户登录成功,并且给客户端设置一个cookie,否则用户登陆失败.
    let user = req.body;
    let data = {};
    if(user.email){
        //注意:如果要进行字符串比较,这里的user.email必须被双引号包住
        let searchSql = 'SELECT weekly_email,weekly_password,weekly_id FROM user WHERE weekly_email="'+user.email+'"';
        pool.query(searchSql,function(err,result){
            if(err){
                console.log(err);
                data = {
                    msg:"服务器错误",
                    code:5000,
                    success:false
                };
            }else{
                console.log('ok');
                //这里只能判断长度,不能用result!=[],因为数组也是对象,对象默认是不相等的
                if(result.length!=0){
                    //当不为空,说明用户存在
                    console.log(result);
                    if(result[0].weekly_password===user.password){
                        data = {
                            msg:"登陆成功",
                            code:2000,
                            success:true,
                            user:{
                                id:result[0].weekly_password,
                                userName:result[0].weekly_email
                            }
                        };
                        //登陆成功之后,设置cookie
                        
                    }else{
                        data = {
                            msg:"账户或密码错误",
                            code:3000,
                            success:false
                        };
                    }
                }else{
                    //用户不存在
                    data = {
                        msg:"账户或密码错误",
                        code:3000,
                        success:false
                    };
                }
            }
            //同步和异步的回调分开写,异步的res.end()记得写在回调函数的最后面,以免造成write after end的错误
            res.write(JSON.stringify(data));
            res.end();
        });
    }else{
        data = {
            msg:"用户名为空",
            code:1004,
            success:false
        };
        res.write(JSON.stringify(data));
        res.end();
    }
})