//子进程访问父进程的标准输出
//通俗一点理解,子进程向父进程的标准输出发送数据
process.stdout.write('子进程当前工作目录为:'+process.cwd());
process.argv.forEach(function(val,index,arr){
    process.stdout.write('\r\n'+index+':'+val);
})