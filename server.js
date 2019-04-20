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

var net = require('net');
var server = net.createServer();
var fs = require('fs');
server.on('connection',function(socket){
    console.log('客户端与服务器端的连接已经建立')
    socket.setEncoding('utf8')
    var readStream = fs.createReadStream('./server.js')
    readStream.on('data',function(data){
        var flag = socket.write(data);
        console.log('write方法的返回值为:'+flag);
        console.log('缓存队列中当前缓存了%d字符',socket.bufferSize);
    })
    socket.on('data',function(data){
        console.log('已接收到客户端发送的数据')
    })
    socket.on('drain',function(){
        console.log('TCP缓存区中数据已经全部发送')
    })
})
server.listen(8431,'localhost')