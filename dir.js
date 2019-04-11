var fs = require('fs');
fs.mkdir('./newTest',function(err){
    if(err) console.log('创建目录操作失败');
    else console.log('创建目录操作成功')
})
fs.readdir('./test',function(err,files){
    if(err) console.log('读取目录失败')
    else console.log(files)
})