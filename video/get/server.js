const http = require('http');
const querystring = require('querystring');

http.createServer(function(req,res){
    //req获取前台的数据
    var get = {};
   
    if(req.url.indexOf('?')!=-1){
        var arr = req.url.split('?');
        console.log(arr[0])
        //地址
        console.log(arr[1])
        //数据
        get = querystring.parse(arr[1])
        console.log(get)
    }else{
        var url = req.url
    }

    res.write('aaa');
    res.end();
}).listen(8080);
