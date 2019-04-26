// var http = require('http');
// process.on('message',function(msg,server){
//     if(msg==='server'){
//         console.log('子进程中的服务器已创建');
//         var httpServer = http.createServer();
//         httpServer.on('request',function(req,res){
//             if(req.url!=='/favicon.ico'){
//                 sum=0;
//                 for(var i = 0;i<1000000;i++){
//                     sum+=i;
//                 }
//                 res.write('客户端请求在子进程中被处理');
//                 res.end('sum='+sum);
//             }
//         })
//         httpServer.listen(server)
//     }
// })


// process.on('message',function(m,socket){
//     if(m === 'socket'){
//         console.log('客户端请求被子进程处理')
//     }
// })


var http = require('http');
http.createServer(function(req,res){
    if(req.url!=='/favicon.ico'){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<head><meta charset="UTF-8"/></head>');
        res.end("你好\n");
        console.log('这段代码被运行在子进程中');
    }
}).listen(1337)