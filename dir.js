// var fs = require('fs');
// fs.mkdir('./newTest',function(err){
//     if(err) console.log('创建目录操作失败');
//     else console.log('创建目录操作成功')
// })
// fs.readdir('./test',function(err,files){
//     if(err) console.log('读取目录失败')
//     else console.log(files)
// })
// var files = fs.readdirSync('./test');
// console.log(files)

// 查看与修改文件或目录的信息
var fs = require('fs');
// fs.stat('sample.txt',function(err,stats){
//     console.log(stats)
// })
// var state = fs.statSync('sample.txt');
// console.log(state);
// fs.open('sample.txt','r',function(err,fd){
//     fs.fstat(fd,function(err,stats){
//         console.log(stats)
//     })
// })

//检查文件或者目录是否存在
// fs.exists('sample.txt',function(exists){
//     if(exists) console.log('该文件存在')
//     else console.log('该文件不存在')
// })

//获取文件或者目录的绝对路径
//  var file =

 //用unpipe取消目标文件的写入操作
 var file = fs.createReadStream('./1.jpg');
 var out =fs.createWriteStream('./b.jpg');
 file.pipe(out,{end:false});
 setTimeout(() => {
    file.unpipe(out);
    out.end(); 
 }, 1); 