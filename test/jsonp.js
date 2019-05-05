var express = require('express');
var urlLib = require('url');
var server = new  express();
server.listen(8080);
server.use('/user/',function(req,res){
    var obj = urlLib.parse(req.url,true)
    var a = {
        ip:1,
        city:'xian',
        region_name:'shanxi'
    }
    res.write(obj.query.callback+'('+JSON.stringify(a)+')');
    // console.log(url);
    // res.write()
    res.end()
})