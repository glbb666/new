//require  请求:引入模块
//module    模块:
//exports   输出:


//不存在全局
var a = 1;
var b = 2;
//控制暴露谁出去
//对外输入一个东西
// exports.a = a;

//module 批量输出东西
module.exports = {
    a,
    b,
}


//npm:NODEJS包管理器
//1.统一下载途径
//2.自动下载依赖
//node.module 下载下来的模块
//npm i xxx
//npm ui xxx
//加./
//不加./ 放在node_modules里面