// var fs = require('fs');
// fs.mkdir('./newTest',function(err){
//     if(err) console.log('创建目录操作失败');
//     else console.log('创建目录操作成功')
// })
// fs.readdir('./test',function(err,files){
//     if(err) console.log('读取目录失败')
//     else console.log(files)
// })
// var files = fs.readdirSync('./test');
// console.log(files)

// 查看与修改文件或目录的信息
var fs = require('fs');
// fs.stat('sample.txt',function(err,stats){
//     console.log(stats)
// })
// var state = fs.statSync('sample.txt');
// console.log(state);
// fs.open('sample.txt','r',function(err,fd){
//     fs.fstat(fd,function(err,stats){
//         console.log(stats)
//     })
// })

//检查文件或者目录是否存在
// fs.exists('sample.txt',function(exists){
//     if(exists) console.log('该文件存在')
//     else console.log('该文件不存在')
// })

//获取文件或者目录的绝对路径
// var cache = {'/etc':'/etc'};
// fs.realpath('./sample.txt',function(err,resolvePath){
//    console.log(resolvePath);
// })

// var resolvePath = fs.realpathSync('./sample.txt',cache)
// console.log(resolvePath)

//修改文件访问时间以及修改时间
// fs.utimes('./sample.txt',new Date(),new Date(),function(err){
//    if(err) console.log('修改文件时间操作失败');
//    console.log('修改文件时间操作成功')
// })

//修改文件或目录的读写权限
//读4,写2,执行1
//第一个值是0,第二个值是所有者，第三个值是所有者所在组，第四个值是其他人。
// fs.chmod('./sample.txt',0240,function(err){
//    if(err) console.log('修改文件权限操作失败。')
//    else console.log('修改文件权限操作成功')
// })

//使用rename方法移动文件或目录
// fs.rename('./test/a.txt','./test.txt',function(err){
//    if(err) console.log('移动文件失败')
//    else console.log('移动文件成功')
// })
//创建文件的硬链接
// fs.link('./sample.txt','./test.txt',function(err){
//    if(err) console.log('创建硬链接失败')
//    else console.log('创建硬链接成功')
// })
// //删除硬链接
// fs.unlink('./sample.txt',function(err){
//    if(err) console.log('删除硬链接失败')
//    else console.log('删除硬链接成功')
// })
//symlink创建与查看符号链接
// fs.symlink('./test.txt','./sample.txt',function(err){
//    if(err) console.log('创建符号链接失败')
//    else console.log('创建符号链接成功')
// })
// //truncate截断文件
// fs.truncate('./test.txt',10,function(err){
//    if(err) console.log('截断文件失败')
//    else console.log('截断文件成功')
// })
// //删除空目录
// fs.rmdir('./2',function(err){
//    if(err) console.log("删除空目录失败")
//    else console.log("删除空目录成f功")
// })
// //监视文件或目录
// fs.watchFile('./test.txt',function(cur,prev){
//    if(Date.parse(prev.ctime)==0){
//       //ctime就是change time 最后一次改变文件或目录的时间
//       //mtime就是modify time 最后一次修改文件或目录的时间
//       //atime就是access time 最后一次访问文件或目录的时间
//       console.log('test.txt文件被创建')
//    }else if(Date.parse(cur.ctime)==0){
//       console.log('test.txt文件被删除')
//    }else if(Date.parse(prev.mtime)!=Date.parse(cur.mtime)){
//       console.log('test.txt文件被修改')
//    }else{
//       ;
//    }
// })

// //使用多个watch方法监视同一个文件
// var fun1 = function(cur,prev){
//    if(Date.parse(cur.ctime)!=0){
//       console.log('test.txt文件的尺寸为'+cur.size+'字节');
//    }
// }
// fs.watchFile('./test.txt',fun1)

// //使用unwatchFile方法取消当文件发生改变时要执行的处理
// fs.unwatchFile('./test.txt',fun1)

//使用watch方法监视文件
// fs.watch('../node',function(event,filename){
//    console.log(event)
//    console.log(filename)
// })

//使用createReadStream方法读取文件
// var file = fs.createReadStream('./test.txt',{start:3,end:12,encoding:"utf8"});
// file.on('open',function(fd){
//    console.log('开始读取文件')
// })
// file.on('data',function(data){
//    console.log('读取到数据')
//    console.log(data)
// })
// file.on('end',function(){
//    console.log('文件已经全部读取完毕')
// })
// file.on('close',function(){
//    console.log('文件被关闭')
// })
// file.on('error',function(){
//    console.log('读取文件失败')
// })

// //暂停并恢复文件的读取
// var readStream = fs.createReadStream('./test.txt');
// readStream.pause();
// readStream.on('data',function(data){
//    console.log('获取到的数据为：'+data);
// })
// setTimeout(function(){
//    readStream.resume()
// },1000);

//使用createWriteStream对象写入文件
var file = fs.createReadStream('./test.txt',{start:3,end:11,encoding:"utf8",autoClose:false});
var out = fs.createWriteStream('./out.txt');
file.on('data',function(data){
   out.write(data);
   console.log('文件已经被写入')
})
out.on('open',function(){
   console.log('需要被写入的文件已经被打开')
})
file.on('end',function(){
   // 文件已经读取到末尾了
   out.end('再见',function(){
      console.log('文件全部写入完毕');
      console.log('总共写入%d字节数据',out.bytesWritten)
   })
})

//使用WriteStream对象的write方法中的callback参数指定回调函数
// var file = fs.createReadStream('./test.txt');
// var out  = fs.createWriteStream('./out.txt');
// file.on('data',function(data){
//    out.write(data,function(){
//       console.log(data.toString())
//    })
// })


//观察WriteStream对象的write方法的返回结果并监听drain事件
// var out = fs.createWriteStream('./test.txt');
// for(var i = 1;i<=10000;i++){
//    var flag = out.write(i.toString());
//    console.log(flag);
//    //flag是write的返回值，true代表系统缓存区中还可以写入数据，false代表系统缓存区中不能写入数据
// }
// out.on('drain',function(){
//    console.log('缓存区中的数据已经全部输出');
// })





 //用unpipe取消目标文件的写入操作
//  var file = fs.createReadStream('./1.jpg');
//  var out =fs.createWriteStream('./b.jpg');
//  file.pipe(out,{end:false});
//  setTimeout(() => {
//     file.unpipe(out);
//     out.end(); 
//  }, 1); 