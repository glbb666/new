// var _name,_age;
// var name = '',age = 0;
// //模块对象的构造函数
// var foo = function(name,age){
//     _name = name;
//     _age = age;
// }
// foo.prototype.GetName = function(){
//     return _name;
// }
// foo.prototype.SetName = function(name){
//     _name = name;
// }
// foo.prototype.GetAge = function(){
//     return _age;
// }
// foo.prototype.SetAge = function(age){
//     _age = age;
// }
// foo.prototype.name = name;
// foo.staticName = '';
// foo.staticFunction = function(){
//     console.log(foo.staticName);
// }
// module.exports = foo;
// console.log(module.id);
// module.id = 'foo';
// console.log(module.id);
// console.log(module.filename)
// console.log(module.loaded)
console.log(module.parent)
var bar1 = require('./bar1.js');
var bar2 = require('./bar2.js')
console.log(module.children)