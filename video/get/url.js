const urlLib = require('url')
var obj = urlLib.parse('index.html?user=w&pass=y',true)
console.log(obj)