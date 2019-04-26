var repl = require("repl");
// 使用start方法来开启一个REPL运行环境
var con=repl.start().context;
con.msg="示例消息";
con.testFunction=function(){console.log(con.msg);};