// process.stdin.resume();
// process.stdin.on('data',function(chunk){
//     process.stdout.write('进程接收到数据:'+chunk)
// })
// process.argv.forEach(function(val,index,array){
//     console.log(index+':'+val);
// })

// function foo(){
//     console.log('foo');
// }
// function a(){
//     console.log('a');
// }
// process.nextTick(a);
// process.nextTick(foo);
// console.log('bar')


// var fs = require('fs');
// function foo(){
//     function beginAnotherTask(){
//         var file = fs.createReadStream('./crash.mp3');
//         file.on('data',function(data){
//             console.log('读取到%d字节。',data.length);
//         });
//     }
//     process.nextTick(beginAnotherTask)
// }
// //两个异步是同时进行的，因为nextTick会在下一个异步的事件回调函数开始执行时调用
// var file =  fs.createReadStream('./crash.mp3');
// file.on('data',function(data){
//     console.log('从crash.mp3文件中读取到%d字节',data.length);
// })
// foo();

// chdir和cwd方法
// console.log('当前目录:'+process.cwd());
// process.chdir('../')
// console.log('上层目录:'+process.cwd());

//使用umask修改进程的文件权限掩码
// var time = process.hrtime();
// var oldmask,newmask = 0644;
// oldmask = process.umask(newmask);
// console.log('修改前的掩码:'+oldmask.toString(8)+'修改后的掩码:'+newmask.toString(8));
// var diff = process.hrtime(time);
// console.log('耗时%d',diff[0]*1e9+diff[1])

//exit事件回调函数的使用示例
// process.on('exit',function(){
//     console.log('Node.js进程被退出')
// })
// process.exit();

// SIGINT事件的回调函数
// process.stdin.resume();
// process.on('SIGINT',function(){
//     console.log('接收到SIGINT信号')
// })

//使用spawn开启子进程
var cp =require('child_process');

var sp1 = cp.spawn('node',['test1.js','one','two','three','four'],{cwd:'./test',stdio:['ignore','pipe','pipe']});
// 默认情况下:options.stdio 设置为 ['pipe', 'pipe', 'pipe']
//每一个pipe使得父进程可以访问子进程的sp1.stdin sp1.stdout sp1.stderr
var sp2 = cp.spawn('node',['test2.js'],{stdio:'pipe'})
// var sp2 = cp.spawn('node',['test2.js'],{stdio:'ignore'})

//监听子进程标准输出的data事件
sp1.stdout.on('data',function(data){
    console.log('子进程标准输出:'+data);
    // 把sp1的标准输出的data作为sp2的输入,因为sp2的stdio[0]的值为'pipe',因此父进程可以访问sp2的标准输入
    sp2.stdin.write(data);
})
//当子进程退出了,退出父进程
sp1.on('exit',function (code,signal){
    console.log('子进程退出,退出代码为:'+code);
    process.exit();
})

