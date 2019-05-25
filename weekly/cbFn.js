const myselfSql = require('./mysql.js');
const poolP = require('./poolPromise.js');
module.exports = {
    register(pool){
        return function(req,res){
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
                res.send(JSON.stringify(data));
            }else if(user.password.length<4||user.password.length>18){
             // 2.密码的长度符合要求
               data = {
                        msg:"注册失败,密码长度不对!",
                        code:1004,
                        success:false
                    };
                    res.send(JSON.stringify(data));
            }else{
            // 3.用户名在数据库中不存在
            //在数据库中创建一个user表，保存注册的用户信息
            //当要新添入用户的时候，就查看user表，如果有相同的用户名，那么注册成功，否则注册失败。
            //直接使用连接池
            let addSql = myselfSql.insert('user',['user_id','user_email','user_password','user_phone'],[0,"'"+user.email+"'","'"+user.password+"'","'"+user.phone+"'"])
            //增加成员
            let promise = poolP.poolPromise(pool,addSql);
            promise.then(result=>{
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
                res.send(JSON.stringify(data));
            }).catch(err=>{
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
                    res.send(JSON.stringify(data));
            })
            }
            //结束响应
        }
    },
    login(pool){
        return function(req,res){
            console.log("登录:");
            console.log(req.body);
            //当登陆的时候,调取数据库中user表的内容,如果表中的内容存在,那么说明这个用户已经注册过了,那么我们就验证用户输入的密码和数据库中的密码是否匹配,如果匹配的话,那么就让用户登录成功,并且给客户端设置一个cookie,否则用户登陆失败.
            let user = req.body;
            let data = {};
            if(user.email){
                //注意:如果要进行字符串比较,这里的user.email必须被双引号包住
                let searchSql = myselfSql.select('user',['user_email','user_password','user_id'], 'user_email="'+user.email+'"');
                // console.log(searchSql);
                let promise = poolP.poolPromise(pool,searchSql);
                promise.then(result=>{
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
                            if(!req.session['id']){
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
                    res.send(JSON.stringify(data));
                }).catch(err=>{
                    console.log(err);
                        data = {
                            msg:"服务器错误",
                            code:5000,
                            success:false
                        };
                        res.send(JSON.stringify(data));    
                })
            }else{
                data = {
                    msg:"用户名为空",
                    code:1004,
                    success:false
                };
                res.send(JSON.stringify(data));
            }
        }
    },
    quick(pool){
         //获取某用户三周(上,这,下)周报接口
        //因为每次用if判断session都是一件比较麻烦的事情,所以我就自己写了一个判断session的中间件,当session合法的时候，才会执行下一个use的内容。
        //在一个路径上挂载一个中间件之后，每当请求的路径的前缀部分匹配了这个路由路径，那么这个中间件就会被执行。 由于默认的路径为/，中间件挂载没有指定路径，那么对于每个请求，这个中间件都会被执行。我们还可以在第一个参数中使用正则表达式,对发来的请求进行筛选。
        //sessionOk检测发来的请求有没有session值,如果有的话，才开放对'/weekly_war/task/getTasks.do'接口的请求。 
        return function(req,res){
            console.log('快捷');
            let data = {};
            // console.log(Object.entries(req.session))
            // if(req.session['id']){
               // Object.keys(req.session).length>1
                //1.如果session存在,说明我们已经通过session_id查到对应的session了
                //2.因为session是一个对象,当session没有值时，是一个空对象，布尔值为false的只有null,undefined,0,"",NaN，所以说空对象的布尔值为true
                //3.为了校验它是不是一个空对象,我们可以用es6的Object.keys()方法,这个方法的返回值是一个由参数对象自身的(不含继承的)可枚举键名组成的数组,我们可以通过判断数组的长度来知道req.session是不是一个空对象。
                //4.它原本还存在一个值_ctx,所以我们判断的条件应该在原本的条件下加一
                    let lastTask ;
                    let thisTask ;
                    let nextTask ;
                    // from_unixtime用来把时间戳转换为日期
                    //这里我进行了改写
                    /* 
                        这里的curdata()取得的一周是从周日开始到周六,而我想获得的一周是从周一开始到周日,也就是curdata()加一天。我首先想到的是,我可以用明天作为一周的基准 ,但是我发现YEARWEEK(DATE_SUB(curdate(),INTERVAL -1 DAY))没有起作用,于是我修改了一下时间戳,因为时间戳的单位为毫秒,所以我让时间戳减去一天等于本周(星期日到星期六)。这样的话,相当于时间戳不减去一天等于本周(星期一到星期天)
                    */
                    let lastSQL = myselfSql.select('content',"*","YEARWEEK(date_format(from_unixtime((weekly_taskData-24*3600)/1000),'%Y-%m-%d')) = YEARWEEK(curdate())-1;");
        
                   //本周：从周日开始到周六
                    let thisSQL = myselfSql.select('content',"*","YEARWEEK(date_format(from_unixtime((weekly_taskData-24*3600)/1000),'%Y-%m-%d')) = YEARWEEK(curdate());");
        
                
                    let nextSQL = myselfSql.select('content',"*","YEARWEEK(date_format(from_unixtime((weekly_taskData-24*3600)/1000),'%Y-%m-%d')) = YEARWEEK(curdate())+1;");
        
                    Promise.all(poolP.poolPromise(pool,[lastSQL,thisSQL,nextSQL])).then(result=>{
                        //这里面的内容只会执行一次
                        // console.log(result);
                        data={
                            msg:"成功",
                            code:2000,
                            success:true,
                            lastTask:result[0],
                            thisTask:result[1],
                            nextTask:result[2]
                        }
                        res.send(JSON.stringify(data));
                    }).catch(e=>{
                        console.log(e)
                        data={
                            msg:"服务器错误",
                            code:5000,
                            success:false,
                        }
                        res.send(JSON.stringify(data));
                    });     
                // console.log(data);
        }
    },
    addTask(pool){
        return function(req,res){
            //在数据库中建一张表存储周报
            console.log('添加');
            console.log(req.query);
            let week = req.query;
            week.taskDate = Date.parse(week.taskDate);
            let insertSql = myselfSql.insert('content',['weekly_taskData','weekly_taskName','weekly_content','weekly_completeDegree','weekly_timeConsuming','weekly_id','user_id'],[week.taskDate,week.taskName,week.content,Number(week.timeDegree),week.timeConsuming,0,week.timeId]);
            // console.log(insertSql);
            let promise = poolP.poolPromise(pool,insertSql);
            promise.then(result=>{
                data = {
                    msg:"插入成功",
                    code:2000,
                    success:true,
                }
                res.send(JSON.stringify(data));
            }).catch(err=>{
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
                res.send(JSON.stringify(data));
            })
        }
    },
    allTasks(pool){
        return function(req,res){
            console.log("自己的所有:")
            console.log(req.body);
            //可以获取到page和Params;
            // let page = req.body.pageParams.page;
            // let pageSize = req.body.pageParams.pageSize;
            let data;
            let selectSql = myselfSql.select('content',"*","user_id="+req.body["userId"]);

            let promise = poolP.poolPromise(pool,selectSql);
            promise.then(result=>{
                let length = result.length;
                // result = result.slice((page-1)*pageSize,page*pageSize);
                data = {
                    msg:"获取成功",
                    code:2000,
                    success:true,
                    tasks:result,
                    // total:length
                    // totalPage:Math.ceil(length/pageSize)
                }
                res.send(JSON.stringify(data));
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    deleteTask(pool){
        return function(req,res){
            let deleteSql = myselfSql.del('content','weekly_id='+req.query.id);
            let promise = poolP.poolPromise(pool,deleteSql);
            let data = {};
            promise.then(result=>{
                data = {
                    msg:"成功",
                    code:2000,
                    success:true
                };
                res.send(JSON.stringify(data))
            }).catch(err=>{
                console.log(err);
                data = {
                    msg:"失败",
                    code:5000,
                    success:false
                };
                res.send(JSON.stringify(data));
            })
        }
    },
    logout(){
        return function(req,res){
            req.session.id = null;
            res.clearCookie('user');
            res.redirect(302,'http://localhost:8080/#/login');
        }
    },
    getInfo(){
        return function(req,res){
            let data = {};
            let searchSql = myselfSql('user','*','user_id='+req.session.id);
            let promise = poolP.poolPromise(searchSql);
            promise.then(result=>{
                console.log(result);
                data = {
                    msg:"获取成功",
                    code:2000,
                    success:true,
                }
                res.send(JSON.stringify(data));
            }).catch(err=>{
                data = {
                    msg:"获取失败",
                    code:5000,
                    success:false
                }
                res.send(JSON.stringify(data));
            })
            
        }
    },
    modiInfo(){

    }
}