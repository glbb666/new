const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer')
const fs = require('fs')
const path = require('path')
//设置文件上传后存到的地址
var objMulter = multer({dest:'./upload'});

var server = express();

//错误
//server.use(bodyParser.urlencoded({extended:false}))
//设置可以上传任何类型的文件
server.use(objMulter.any())

server.post('/',function(req,res){
    // console.log(path.parse(req.files[0].originalname).ext)
    var newName = req.files[0].path+path.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,newName,function(err){
        if(err)
            console.log("上传文件失败")
        else
            console.log("上传文件成功")    
    })
})
fs

server.listen(8080)