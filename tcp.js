// //  创建tcp服务器
// let net = require('net');
// let server = net.createServer(function(socket){
//     console.log('客户端与服务器连接已经建立')
//     console.log('socket对象所在的端口信息为%j',socket.address())
//     //查询当前所在的客户端连接数
//     server.getConnections(function(err,count){
//         console.log('当前存在%d个客户端连接',count);
//         //设置最大连接数
//         server.maxConnections = 2;
//         console.log('TCP服务器的最大连接数为%d',server.maxConnections);
//     })
//     socket.on('data',function(data){
//         socket.setEncoding('utf8');
//         console.log(data);
//         //客户端发送数据的字节数
//         console.log("已接受到%d字节数据",socket.bytesRead);
//     })
//     socket.on('end',function(){
//         console.log('客户端连接被关闭')
//     })
//     server.close(function(){
//         console.log('服务器已经被关闭。')
//     })
// })
// server.listen(8431,'localhost',function(){
//     console.log('服务器端开始监听')
//     console.log(server.address())
// })
// server.on('error',function(e){
//     if(e.code == 'EADDRINUSE'){
//         console.log('服务器地址以及端口已被占用')
//     }
// })

//使用pipe方法把所有客户端发送数据写入文件
// let net  = require('net');
// let file = require('fs').createWriteStream('./test.txt');
// let server = net.createServer(function(socket){
//     socket.pipe(file,{end:false});
//     socket.on('end',function(){
//         file.end('再见')
//     })
// });
// server.listen(8341,'localhost');

// //socket对象的pause方法和resume方法的使用示例
// let net = require('net');
// let file = require('fs').createWriteStream('./test.txt');
// let file1 = require('fs').createWriteStream('./test1.txt');
// let server = net.createServer();
// server.on('connection',function(socket){
//     socket.pause();
//     setTimeout(
//         function(){
//             socket.resume();
//             socket.pipe(file)
//         }, 20000);
//     setTimeout(
//         ()=>{
//         socket.resume();
//         socket.pipe(file1)
//         },20000)
//     // socket.on('data',function(data){
//     //     socket.pause();
//     //     setTimeout(function(){
//     //         socket.resume();
//     //     },10000);
//     // })
// })
// server.listen(8431,'localhost')

//使用setTimeout方法指定客户端连接的超时时间
// var net = require('net');
// var file = require('fs').createWriteStream('./test.txt');
// var server = net.createServer();
// server.on('connection',function(socket){
//     // 指定客户端的超时时间
//     socket.setTimeout(20*1000);
//     socket.pause();
//     //当超时之后触发的事件
//     socket.on('timeout',function(){
//         socket.resume();
//         socket.pipe(file);
//         //取消对客户端超时时间的指定
//         // socket.setTimeout(0);
//     })
//     //客户端超时后发送的数据，依然要暂时提到缓存中
//     socket.on('data',function(data){
//         socket.pause();
//     })
// })
// server.listen(8431,'localhost')
// //取消对客户端超时时间的指定

// var net = require('net');
// var file = require('fs').createWriteStream('./test.txt');
// var server = net.createServer();
// server.on('connection',function(socket){
//     // 指定客户端的超时时间
//     socket.setTimeout(20*1000);
//     socket.pause();
//     //当超时之后触发的事件
//     socket.on('timeout',function(){
//         socket.resume();
//         socket.pipe(file);
//         //取消对客户端超时时间的指定
//         // socket.setTimeout(0);
//     })
//     //客户端超时后发送的数据，依然要暂时提到缓存中
//     socket.on('data',function(data){
//         socket.pause();
//     })
// })
// server.listen(8431,'localhost')

//创建tcp客户端
var net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');
client.connect(8431,'localhost',function(){
    console.log('已连接到服务器端');
    client.write('你好')
    //指定tcp客户端与tcp服务端建立连接10s之后关闭客户端连接
    setTimeout(function(){
        client.end('再见')
    },10000)
})
client.on('data',function(data){
    console.log('已接受到服务器端发送的数据'+data);
})
client.on('error',function(err){
    console.log('与服务器连接或通信的过程中发生了一个错误，错误编码为%s',err.code);
    client.destroy();
})