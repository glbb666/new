var express = require('express');
var urlLib = require('url');
var server = new  express();
server.listen(8080);
server.use('/',function(req,res){
    console.log(req.url);
    
})