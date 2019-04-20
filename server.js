// //创建tcp服务器
// var net = require('net');
// var server = net.createServer({allowHalfOpen:true});
// server.on('connection',function(socket){
//     console.log('客户端与服务器连接已建立');
//     socket.setEncoding('utf8');
//     socket.on('data',function(data){
//         console.log('已接受客户端发送的数据:'+data);
//         socket.write('确认数据:'+data);
//     })
//     socket.on('error',function(err){
//         console.log('与客户端连接或通信的过程中发生了一个错误,错误编码为%s',err.code);
//         socket.destroy()
//     })
//     //客户端和服务端的end方法是相互触发的     
//     socket.on('end',function(){
//         console.log('客户端连接被关闭');
//         //客户端连接被全部关闭时退出应用程序
//         server.unref();
//         //阻止应用程序的退出
//         // server.ref();
//     })
//     socket.on('close',function(had_error){
//         if(had_error){
//             console.log('由于一个错误导致socket端口被关闭');
//             server.unref()
//         }else{
//             console.log('socket端口被正常关闭')
//         }
//     });
//     //使用tcp服务器对象的close方法拒绝新的客户端连接请求
//     server.getConnections(function(err,count){
//         if(count==2)
//             server.close();
//     })
// });
// server.listen(8431,'localhost');
// server.on('close',function(){
//     console.log('tcp服务器被关闭')
// })

//使用socket端口对象的write方法发送小尺寸文件

// var net = require('net');
// var server = net.createServer();
// var fs = require('fs');
// server.on('connection',function(socket){
//     console.log('客户端与服务器端的连接已经建立')
//     socket.setEncoding('utf8')
//     var readStream = fs.createReadStream('./server.js')
//     readStream.on('data',function(data){
//         var flag = socket.write(data);
//         console.log('write方法的返回值为:'+flag);
//         console.log('缓存队列中当前缓存了%d字符',socket.bufferSize);
//     })
//     socket.on('data',function(data){
//         console.log('已接收到客户端发送的数据')
//     })
//     socket.on('drain',function(){
//         console.log('TCP缓存区中数据已经全部发送')
//     })
// })
// server.listen(8431,'localhost')
//创建udp服务器和客户端
// var dgram = require('dgram')
// var server = dgram.createSocket('udp4');
// server.on('message',function(msg,rinfo){
//     console.log('已接受客户端发送的数据'+msg);
//     console.log('客户端地址信息为%j',rinfo);
//     var buf = new Buffer('确认信息:'+msg);
//     //设置数据包在被路由器废置之前可以经过的最大路由数目
//     server.setTTL(128);
//     server.send(buf,0,buf.length,rinfo.port,rinfo.address);
//     // console.log(rinfo.port);
//     // console.log(rinfo.address);
//     setTimeout(function(){
//         // server.close();
//         //当不存在与该socket对象进行通信的客户端连接时允许运行UDP服务器的应用程序被正常退出
//         server.unref();
//     },10000)
// });
// server.on('listening',function(){
//     var address = server.address();
//     console.log('服务器开始监听,地址信息为%j',address);
// })
// server.bind(41234,'localhost');

//广播服务器
// var dgram = require('dgram');
// var server = dgram.createSocket('udp4');
// server.on('message',function(msg){
//     var buf = new Buffer('已接收客户端发送的数据'+msg);
//     server.setBroadcast(true);
//     server.send(buf,0,buf.length,41235,"192.168.1.255");
// })
// server.bind(41234,'192.168.1.100');

// 用于发送组播消息的udp服务器
// var dgram = require('dgram');
// var server = dgram.createSocket('udp4');
// server.on('listening',function(){
//     server.setMulticastTTL(128);
//     server.addMembership('230.185.192.108');
// })
// setInterval(broadCast,1000);
// function broadCast(){
//     var buf = new Buffer((new Date()).toLocaleDateString());
//     server.send(buf,0,buf.length,8088,"230.185.192.108");
// }