//在子进程中process代表子进程
process.stdout.write('子进程当前工作目录为:'+process.cwd());
process.argv.forEach(function(val,index,arr){
    process.stdout.write('\r\n'+index+':'+val);
})
