//在下一次事件响应中执行代码
process.nextTick(function(){
    console.log('nextTick callback!')
})
console.log('nextTick was set')
//程序即将退出时的回调函数
process.on('exit',function(code){
    console.log('about to exit with code:'+code);
})