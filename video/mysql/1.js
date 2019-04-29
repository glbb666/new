//客户端
const mysql = require('mysql')

//1.连接
//createConnection(哪台服务器,用户名,密码,库)
var db = mysql.createConnection({host:'localhost',user:'root',password:'191026',database:'runoob'})

// console.log(db)
//2.查询
db.query('SELECT * FROM `student`;',(err,data)=>{
    if(err)
        console.log('出错了',err)
    else
        console.log('成功了',data)
})