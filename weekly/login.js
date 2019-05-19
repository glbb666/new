/*
    用连接池连接数据库
*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookie = require('cookie');

//用来读取cookie的
const cookieParser = require('cookie-parser');
//session 是基于 cookie生成的
const cookieSession = require('cookie-session');
const myselfSql = require('./mysql.js');


let server = new express();
server.use(bodyParser.urlencoded({}))
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
    let addSql = myselfSql.insert('user',['user_id','user_email','user_password','user_phone'],[0,user.email,user.password,user.phone])
    //增加成员
    pool.query(addSql,function(err,result){
        if(err){
            console.log(err);
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
        let searchSql = myselfSql.select('user',['user_email','user_password','user_id'], 'user_email="'+user.email+'"');
        // console.log(searchSql);
        pool.query(searchSql,function(err,result){
            if(err){
                console.log(err);
                data = {
                    msg:"服务器错误",
                    code:5000,
                    success:false
                };
            }else{
                //这里只能判断长度,不能用result!=[],因为数组也是对象,对象默认是不相等的
                if(result.length!=0){
                    //当不为空,说明用户存在
                    console.log(result);
                    if(result[0].user_password===user.password){
                        data = {
                            msg:"登陆成功",
                            code:2000,
                            success:true,
                            user:{
                                id:result[0].user_id,
                                userName:result[0].user_email
                            }
                        };
                        //给跳转之后的页面设置cookie
                        //登陆成功之后,设置cookie
                        // req.secret = 'secret';
                        res.cookie('user',result[0].user_id,{
                            //因为path为绝对路径
                            //只有匹配到相应的path,才会设置上cookie
                            path:'/',//默认值为'/'
                            maxAge:30*24*3600*1000,
                            signed:true
                        }); 
                        if(typeof req.session['login'] == 'undefined'){
                            req.session['id'] = result[0].user_id;     
                        }
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
//获取某用户三周(上,这,下)周报
server.get('/weekly_war/task/getTasks.do',function(req,res){
    console.log('快捷');
    let data = {};
    // console.log(Object.entries(req.session))
    // if(req.session['login']){
        if(1){
       // Object.keys(req.session).length>1
        //1.如果session存在,说明我们已经通过session_id查到对应的session了
        //2.因为session是一个对象,当session没有值时，是一个空对象，布尔值为false的只有null,undefined,0,"",NaN，所以说空对象的布尔值为true
        //3.为了校验它是不是一个空对象,我们可以用es6的Object.keys()方法,这个方法的返回值是一个由参数对象自身的(不含继承的)可枚举键名组成的数组,我们可以通过判断数组的长度来知道req.session是不是一个空对象。
        //4.它原本还存在一个值_ctx,所以我们判断的条件应该在原本的条件下加一
            let lastTask ;
            let thisTask ;
            let nextTask ;
            // from_unixtime用来把时间戳转换为日期
            
            let lastSQL = myselfSql.select('content',"*","YEARWEEK(date_format(from_unixtime(weekly_taskData/1000),'%Y-%m-%d')) = YEARWEEK(DATE_ADD(NOW(),INTERVAL 1 DAY))-2;");

            //把上周日到上周六改成下周一到下周日
            let thisSQL = myselfSql.select('content',"*","YEARWEEK(date_format(from_unixtime(weekly_taskData/1000),'%Y-%m-%d')) = YEARWEEK(DATE_ADD(NOW(),INTERVAL 1 DAY))-1;");

            //把本周日到本周六改成下周一到下周日
            let nextSQL = myselfSql.select('content',"*","YEARWEEK(date_format(from_unixtime(weekly_taskData/1000),'%Y-%m-%d')) = YEARWEEK(DATE_ADD(NOW(),INTERVAL 1 DAY));");

            Promise.all(poolPromise([lastSQL,thisSQL,nextSQL])).then(result=>{
                //这里面的内容只会执行一次
                console.log(result);
                data={
                    msg:"成功",
                    code:2000,
                    success:true,
                    lastTask:result[0],
                    thisTask:result[1],
                    nextTask:result[2]
                }
                res.write(JSON.stringify(data));
                res.end();
            }).catch(e=>{
                console.log(e)
                data={
                    msg:"服务器错误",
                    code:5000,
                    success:false,
                }
                res.write(JSON.stringify(data));
                res.end();
            });     
        }else{
            data={
                msg:"未登录",
                code:1000,
                success:false
            }
            res.write(JSON.stringify(data));
            res.end();
        }
        console.log(data);
})
//添加周报接口
server.get('/weekly_war/task/addTask.do',function(req,res){
    //在数据库中建一张表存储周报
    console.log('添加');
    console.log(req.query);
    let week = req.query;
    week.taskDate = Date.parse(week.taskDate);
    let insertSql = myselfSql.insert('content',['weekly_taskData','weekly_taskName','weekly_content','weekly_completeDegree','weekly_timeConsuming','weekly_id','user_id'],[week.taskDate,week.taskName,week.content,week.timeDegree,week.timeConsuming,0,week.timeId]);
    pool.query(insertSql,function(err,result){
        if(err){
            console.log(err);
            console.log(err.sqlState);
            if(err.sqlState==22007){
                data = {
                    msg:"日期的格式有问题",
                    code:1004,
                    success:false
                }
            }else{
                data = {
                    msg:"服务器错误",
                    code:5000,
                    success:false
                }
            }
        }else{
            data = {
                msg:"插入成功",
                code:2000,
                success:true,
            }
        }
        res.write(JSON.stringify(data));
        res.end();
    })
})
function poolPromise(sql){
    //判断是不是数组，是数组就用Promise.all
    let promise;
    if(sql instanceof Array){
        promise = sql.map(function(id){
            let p = new Promise(function(resolve,reject){
                pool.query(id,(err,result)=>{
                    // console.log(id);
                    if(err) return reject(err);
                    resolve(result); 
                })
            })
            return p;
        })
    }else{
        promise = new Promise(function(resolve,reject){
            pool.query(sql,(err,result)=>{
                if(err) return reject(err);
                resolve(result); 
            })
        })
    }
    return promise;
}
