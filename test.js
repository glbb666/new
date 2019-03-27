//在下一次时间相应中执行代码
process.nextTick(function(){
    console.log('nextTick callback!')
})
console.log('nextTick was set')