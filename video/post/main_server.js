const http =require('http')
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url')

var server = http.createServer(function(req,res){
    //get
    var obj = urlLib.parse(req.url,true)

    var url = obj.pathname;
    const get =obj.query;
    //post

    var str = ''
    req.on('data',function(data){
        str+=data
    })
    req.on('end',function(){
        const post = querystring.parse(str);

        // url——要什么
        // get——get数据
        // POST——post数据

        console.log(url,get,post)
    })

    //文件请求
    var file_name = './www'+url;
    fs.readFile(file_name,function(err,data){
        if(err){
            res.write('404')
        }else{
            res.write(data)
        }
        res.end()
    })
})
server.listen(8080)