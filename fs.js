'use strict'
//使用$需要
//npm i jsdom -g
//npm i jquery -g
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
var $ = require('jquery')(window);
console.log($)

//jquery提供的getJSON就是异步方法
// $.getJSON('http://example.com/ajax',function(data){
//     console.log('IO结果返回后执行')
// })

//异步读取文本文件
var fs = require('fs');
//sample.txt必须在当前目录下
fs.readFile('sample.txt','utf-8',function(err,data){
    //当正常读取时，err参数为null，data参数为读取到的String。当读取发生错误时,err代表第一个错误对象，data为undefined。这也是Node.js标准的回调函数:第一个参数代表错误信息，第二个参数代表结果。后面我们还会经常编写这种回调函数。
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
console.log('不等待IO结果直接执行后续代码...');

//异步读取图片文件
fs.readFile('1.jfif',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log('文件为:'+data);
        console.log('文件的大小为:'+data.length+'bytes')
    }
})