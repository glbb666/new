'use strict'
//Node.js内置的fs模块就是文件系统模块，负责读写文件。

//fs同时提供了同步方法和异步方法

//jquery提供的getJSON就是异步方法
// $.getJSON('http://example.com/ajax',function(data){
//     console.log('IO结果返回后执行')
// })

//异步读取文本文件
var fs = require('fs');
//sample.txt必须在当前目录下
// fs.readFile('sample.txt','utf-8',function(err,data){
//     //当正常读取时，err参数为null，data参数为读取到的String。当读取发生错误时,err代表第一个错误对象，data为undefined。这也是Node.js标准的回调函数:第一个参数代表错误信息，第二个参数代表结果。后面我们还会经常编写这种回调函数。
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })

// //同步读取文本文件
// var data = fs.readFileSync('sample.txt', 'utf-8');
// console.log(data);

// //如果同步读取文件出现错误，则需要用try...catch来获取错误
// try{
//     var data = fs.readFileSync('sample.txt','utf-8');
//     console.log(data);
// }catch(err){
//     //出错了
//     console.log('出错了')
// }

// //异步读取图片文件
// fs.readFile('1.jpg',function(err,data){
//     if(err){
//         console.log(err);
//     }else{     
//         console.log(data);
//         console.log('文件的大小为:'+data.length+'bytes');
//     }
// })

// //同步读取图片文件
// var data = fs.readFileSync('1.jpg');
// console.log(data);
// console.log(data.length+'bytes');

// //同步读取文件和异步读取文件的区别:
// //同步读取的函数和异步函数相比,多了一个Sync后缀,并且不接收回调函数，函数直接返回结果

// //当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。在Node.js中，Buffer对象就是一个包含零个字节或任意个字节的数组(注意和Array不同)
// var data = fs.readFileSync('sample.txt')
// console.log(data);
// console.log(data.length+'bytes');
// console.log('First three bytes:'+data[0]+','+data[1]+','+data[2]);

// //Buffer->String
// var text = data.toString('utf-8');
// console.log(text);

// //String->Buffer
// var buf = new Buffer(text,'utf-8');
// console.log(buf);

// //异步写文件
// var data = 'hello,node.js';
// fs.writeFile('sample.txt',data,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })
// //将缓存区的数据写入文件
// var data = new Buffer('我喜爱编程');
// fs.writeFile('sample.txt',data,function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })
// // 追加数据
// var data = '这是追加的数据';
// var options = {flag:'a'};
// fs.writeFile('sample.txt',data,options,function(err){
//     if(err)console.log('写文件操作失败');
//     else console.log('写文件操作成功')
// })
//复制图片文件
// fs.readFile('./1.jpg','base64',function(err,data){
//     fs.writeFile('./b.gif',data.toString(),'base64',function(err){
//         if(err) console.log('写文件操作失败');
//         else console.log('写文件操作成功')
//     })
// })
// //writeFile也有一个同步方法
// var data2 = 'hello,gl';
// fs.writeFileSync('sample.txt',data2);
// fs.appendFile('sample.txt',data,'utf8',function(err,data){
//     if(err) console.log('追加失败')
//     else console.log('追加成功')
// })
// fs.appendFileSync('sample.txt',data,'utf8')

//打开文件
// fs.open('sample.txt','r',function(err,fd){
//     // console.log(fd);

// })
// var fd = fs.openSync('sample.txt','r')
//read方法

// fs.open('sample.txt','r',function(err,fd){
//     var buf = new Buffer(255);
//     //一个汉字的utf编码为三字节数据
//     //开始写的位置，读的长度，开始读的位置
//     fs.read(fd,buf,0,9,null,function(err,bytesRead,buffer){
//         console.log(buffer.slice(0,bytesRead).toString());
//         //从文件的当前读取位置继续往下读取
//         fs.read(fd,buf,0,9,3,function(err,bytesRead,buffer){
//             console.log(buffer.slice(0,bytesRead).toString())
//             fs.read(fd,buf,0,9,null,function(err,bytesRead,buffer){
//                 console.log(buffer.slice(0,bytesRead).toString())
                
//             })
//         })
//     })
// })
// fs.open('./sample.txt','r',function(err,fd){
//     var buf = new Buffer(255);
//     var bytesRead = fs.readSync(fd,buf,0,9,3);
//     console.log(bytesRead);
//     console.log(buf.slice(0,bytesRead).toString())
// })
// var buf = new Buffer('我喜爱编程');
// fs.open('sample.txt','w',function(err,fd){
//     fs.write(fd,buf,3,9,null,function(err,written,buffer){
//         if(err) console.log('写文件操作失败')
//         else console.log('写文件操作成功')
//         //从文件的当前被写入位置处开始写入文件
//         fs.write(fd,buf,12,3,null,function(err,written,buffer){
//             if(err) console.log('写文件操作失败');
//             else console.log('写文件操作成功')
//         })
//     })
// })
// var buf = new Buffer('我喜爱编程');
// fs.open('sample.txt','w',function(err,fd){
//     fs.write(fd,buf,0,15,null,function(err,written,buffer){
//         if(err) console.log('写文件操作失败')
//         else console.log('写文件操作成功')
//         //把内存缓冲区中的数据全部书写到文件中
//         fs.fsync(fd,function(){});
//         //关闭文件
//         fs.close(fd,function(){});
//     })
// })
// //stat
// //如果我们要获取文件大小，创建时间等信息，可以使用fs.stat(),它返回一个stat对象，能告诉我们文件或目录的详细信息

// fs.stat('sample.txt',function(err,stat){
//     if(err){
//         console.log(err);
//     }else{
//         //是否是文件;
//         console.log('isFile:'+stat.isFile());
//         //是否是目录;
//         console.log('isDirectory:'+stat.isDirectory())
//         if(stat.isFile()){
//             //文件大小
//             console.log('size:'+stat.size);
//             //创建时间,data对象
//             console.log('birth time:'+stat.birthtime)
//             //修改时间，Date对象
//             console.log('modified time:'+stat.mtime)
//         }
//     }
// })

// //stat()也有一个对应的同步函数statSync(),他的返回值也是Stat对象
// var stat = fs.statSync('sample.txt');
// console.log('这是同步输出的:'+stat.birthtime);
