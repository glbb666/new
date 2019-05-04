const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring')
const fs = require('fs');

var server = express();
server.listen(8080);

// server.use(function(req,res,next){
//    var str="";
//     req.on('data',function(data){
//         str+=data
//     });
//     req.on('end',function(){
//         req.body = querystring.parse(str);
//         next();
//     })
// })
server.use(bodyParser.urlencoded({}));
// server.use('/',function(req,res){
//     console.log(req.body)
// })
server.use('/',function(req,res){
    // console.log(req.body);
    // console.log(req.url)
    console.log(req.body)
    // let url = urlLib.parse(req.url,true)
    // console.log(url)
    //当是接口的时候
    // if(url.pathname=='/user'){
    //     // switch
    // }else{
    //     //当是文件的时候
        var file_name = './www'+req.url;
        fs.readFile(file_name,function(err,data){
            if(err){
                res.write('404');
            }else{
                res.write(data);
            }
            res.end();
        })
    // }
})