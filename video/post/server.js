const http = require('http');
const querystring = require('querystring');

http.createServer(function(req,res){
    //post-req


    var str = ''
    //data-有一段数据到达(很多次)
    //end - 全部到达
    var i = 0
    req.on('data',function(data){
        console.log(`第${i++}次收到数据`);
        str+=data;
    });
    //end-数据全部到达(一次)
    req.on('end',function(){
        // console.log(str)
    })
}).listen(8080)

//post数据接受:post 数据比get大得多
//post数据很大 ———— 分段发送