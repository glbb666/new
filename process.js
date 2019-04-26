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

// 使用spawn开启子进程
// var cp =require('child_process');

// var sp1 = cp.spawn('node',['test1.js','one','two','three','four'],{cwd:'./test',stdio:['ipc','pipe','pipe'],detached:true});
// // 默认情况下:options.stdio 设置为 ['pipe', 'pipe', 'pipe']
// //每一个pipe使得父进程可以访问子进程的sp1.stdin sp1.stdout sp1.stderr
// var sp2 = cp.spawn('node',['test2.js'],{stdio:'pipe'})
// // var sp2 = cp.spawn('node',['test2.js'],{stdio:'ignore'})


// //允许父进程先退出,得保证子进程和父进程不能共享标准输入输出错误
// //这里无效
// // sp1.unref()


// //监听子进程标准输出的data事件
// sp1.stdout.on('data',function(data){
//     console.log('子进程标准输出:'+data);
//     // 把sp1的标准输出的data作为sp2的输入,因为sp2的stdio[0]的值为'pipe',因此父进程可以访问sp2的标准输入
//     sp2.stdin.write(data);
//     //使用子进程的kill方法强制关闭子进程
//     // sp1.kill();
// })
// //当子进程退出了,退出父进程
// sp1.on('exit',function (code,signal){
//     //code 是进程的最终退出码
//     if(!code)
//         console.log('子进程退出,退出信号为:'+signal);
//     else
//         console.log('子进程退出,退出代码为:'+code)
//     process.exit();
// })
// sp1.on('error',function(err){
//     console.log('子进程开启失败:'+err);
//     process.exit();
// })
// sp1.on('disconnect',function(){
//     console.log('ipc通道被关闭')
// })

//使用fork方法开启子进程,fork开启的子进程是node.js应用程序的一个实例
// var cp = require('child_process');
// var n = cp.fork(__dirname+'/test.js');
// n.on('message',function(m){
//     console.log('父进程接收到消息:',m);
//     process.exit()
// })
// n.send({userName:'陆凌牛'});

//slient设置为true
// var cp = require('child_process');
// var sp1 = cp.fork('./test/test1.js',['one','two','three','four'],{silent:true});
// var sp2 = cp.fork('test2.js');
// sp1.stdout.on('data',function(data){
//     console.log('子进程标准输出:'+data)
//     // console.log(data.toString())
//     sp2.send(data.toString());
// })
// sp1.on('exit',function(code,signal){
//     console.log('子进程退出,退出代码为:'+code)
//     process.exit()
// })
// sp1.on('error',function(err){
//     console.log('子进程开启失败:'+err)
//     process.exit()
// })

//在send方法中发送服务器对象
// var net = require('net');
// var http = require('http');
// var child_process = require('child_process');
// var fs = require('fs');
// var child = child_process.fork('child.js');
// var server = net.createServer();
// server.listen(1337,'127.0.0.1',function(){
//     child.send('server',server);
//     console.log('父进程中的服务器已经创建');
//     var httpServer = http.createServer();
//     httpServer.on('request',function(req,res){
//         if(req.url!=='/favicon.ico'){
//             var sum = 0;
//             for(var i = 0;i<1000000;i++){
//                 sum+=i;
//             }
//             res.write('客户端请求在父进程中被处理');
//             res.end('sum='+sum);
//         }
//     });
//     httpServer.listen(server);
// })

//父进程与子进程共享socket端口对象
// var child = require('child_process').fork('child.js');
// var server = require('net').createServer();
// server.on('connection',function(socket){
//     if(socket.remoteAddress!=='192.168.1.100'){
//         child.send('socket',socket);
//         return;
//     }
//     socket.end('客户端请求被父进程处理')
// })
// server.listen(42367,'192.168.1.249');

//使用exec方法开启子进程
// var cp = require('child_process');
// var sp1 = cp.exec('node test1.js one two three four',{cwd:'./test'},function(err,stdout,stderr){
//     if(err){
//         console.log('子进程开启失败:'+err)
//         process.exit()
//     }
//     else{
//         console.log('子进程标准输出:'+stdout.toString());
//         sp2.stdin.write(stdout.toString())
//     }
// });
// var sp2 = cp.exec('node test2.js',function(err,stdout,stderr){
//     process.exit()
// })

//使用execFile方法开启子进程
// var cp = require('child_process');
// var sp1 = cp.execFile('test1.bat',['one','two','three','four'],{cwd:'./test'},function(err,stdout,stderr){
//     if(err){
//         console.log('子进程开启失败:'+err);
//         process.exit()
//     }
//     else{
//         console.log('子进程标准输出:'+stdout.toString());
//         sp2.stdin.write(stdout.toString())
//     }
// })
// var sp2 = cp.execFile('test2.bat')

//使用fork方法开启用于运行Node.js应用程序的子进程
// var cluster = require('cluster');
// var http = require('http');
// if(cluster.isMaster){
//     cluster.fork();
//     cluster.fork();
//     cluster.fork();
//     console.log('这段代码被运行在主进程中')
// }
// else{
//     http.createServer(function(req,res){
//         if(req.url!=='/favicon.ico'){
//             res.writeHead(200,{'Content-Type':'text/html'})
//             res.write('<head><meta charset="UTF-8"/></head>')
//             res.end('你好');
//             console.log("这段代码被运行在子进程中")
//         }
//     }).listen(1337)
// }
// cluster.on('fork',function(worker){
//     console.log('子进程'+worker.id+'被开启')
// })
// cluster.on('online',function(worker){
//     console.log('已接收到进程'+worker.id+'的反馈信息');
// })
// cluster.on('listening',function(worker,address){
//     console.log('子进程中的服务器开始监听,地址为:'+address.address+":"+address.port);
// })

//使用setupMaster方法指定子进程中运行的文件
// var cluster = require('cluster');
// cluster.setupMaster({
//     exec:"child.js"
// })
// cluster.fork()
// console.log('这段代码被运行在主进程中');
// console.log('cluster.setting 属性值:%j',cluster.settings);

//在多个子进程中运行HTTP服务器
var cluster = require('cluster');
var http = require('http')
if(cluster.isMaster){
    cluster.fork();
    cluster.fork();
}
else{
    http.createServer(function(req,res){
        if(req.url!=="/favicon.ico"){
            var sum = 0;
            for(var i = 0;i<5000000;i++){
                sum+=i;
            }
            res.writeHead(200);
            res.write('客户端请求在子进程'+cluster.worker.id+"中被处理")
            res.end('sum='+sum)
        }
    }).listen(1337)
}