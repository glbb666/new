// var http = require('http');
// var options = {
//     hostname:'localhost',
//     port:1337,
//     path:'/',
//     method:'GET'
// }
// for(let i = 0;i<10;i++){
//     var req = http.request(options,function(res){
//         res.on('data',function(chunk){
//             console.log('响应内容:'+chunk);
//         })
//     });
//     req.end();
// }

var net = require('net');
var client =new net.Socket();
client.setEncoding('utf8')
client.connect(42367,'192.168.1.249');
client.on('data',function(data){
    console.log(data)
})