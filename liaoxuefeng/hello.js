'use strict'
var s = 'Hello';
function greet(name){
    console.log(s+','+name+'!')
}
function bb(name){
    console.log(name+',don\'t bb')
}
//模块往外暴露变量
module.exports = {
    greet:greet,
    bb:bb
}