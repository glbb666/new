'use strict'
var fs = require('fs');

//打开一个流
var rs = fs.createReadStream('sample.txt','utf-8');
//一个流 rs 对data事件，添加了两个 回调函数，那么，这两个回调函数都会得到完整的数据
rs.on('data',function(chunk){
    //注意:data事件可能会有多次，每次传递的chunk是流的一部分数据,指每次读入的数据
    console.log('DATA1');
    console.log(chunk)
})
rs.on('data',function(chunk){
    //注意:data事件可能会有多次，每次传递的chunk是流的一部分数据
    console.log('DATA2');
    console.log(chunk)
})

rs.on('end',function(){
    console.log('END');
})

rs.on('error',function(){
    console.log('ERROR:'+err);
})

//要以流的形式写入文件,只需要不断调用write()方法，最后以end()结束:
var ws1 = fs.createWriteStream('sample.txt','utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('sample.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n','utf-8'));
ws2.write(new Buffer('END','utf-8'));
ws2.end();
//所有可以读取数据的流都继承自stream.Readable,所有可以写入的流都继承自stream.Writable

//就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个Readable流和一个Writable流串起来以后，所有的数据自动从Readable流进入Writable流，这种操作叫做pipe
var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('out.txt');

rs.pipe(ws);
//默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数
