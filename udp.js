// let dgram = require('dgram');
// let message = new Buffer('你好');
// let client = dgram.createSocket('udp4');
// client.send(message,0,message.length,41234,'localhost',function(err,bytes){
//     if(err) console.log('发送数据失败')
//     else console.log('已发送%d字节数据',bytes);
// })
// client.on('message',function(msg,rinfo){
//     console.log('已接收到服务器发送的数据:%s',msg);
//     //发送者的端口号
//     console.log('服务器地址为%s',rinfo.address);
//     //发送者所发送的字节数
//     console.log('服务器所用端口为%s',rinfo.port)
//     client.close()
// })
// client.on('close',function(){
//     console.log('socket端口被关闭')
// })

//广播客户端
// var dgram = require('dgram');
// var client = dgram.createSocket('udp4');
// client.bind(41235,'192.168.1.102');
// var buf = new Buffer('你好')
// client.send(buf,0,buf.length,41234,'192.168.1.100')
// client.on('message',function(msg,rinfo){
//     console.log('已接受服务器端发送的数据:%s',msg);
// })

// 用于发送组播消息的udp客户端
// var port = 8088;
// var host = '192.168.1.102';
// var dgram = require('dgram');
// var client = dgram.createSocket('udp4');
// client.on('listening',function(){
//     client.addMembership('230.185.192.108')
// })
// client.on('message',function(message,remote){
//     console.log(message.toString())
// })
// client.bind(port,host);
