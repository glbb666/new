const express = require('express');
const static = require('express-static');
var app = new express();
app.use(static('./'));
console.log('创建');
app.listen(8080);