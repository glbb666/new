var fs = require('fs');
var out =  fs.createWriteStream('./message.txt');
//监听子进程标准输入中获取到的数据
// process.stdin.on('data',function(data){
//     out.write(data)
// })
// process.stdin.on('end',function(data){
//     console.log('父进程的标准输入流已经读完了')
//     //结束子进程
//     process.exit();
// })
process.on('message',function(data){
    out.write(data);
})