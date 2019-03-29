'use strict'

//文件服务器
//设定一个目录，然后让Web程序变成一个文件服务器。要实现这一点，我们只需要解析require.url中的路径，然后在本地找到相应的文件，把文件内容发送出去就可以了。
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

//处理本地文件目录需要使用Node.js提供的path模块，它可以方便的构建目录
var path = require('path');

//解析当前目录
var workDir = path.resolve('.');//'User/michael'
console.log(workDir)
//组合完整的文件路径:当前目录+'pub'+'index.html'
var filePath = path.join(workDir,'pub','index.html');
//'Users/michael/pub/index.html'