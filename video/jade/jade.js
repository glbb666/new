const jade= require('jade')

var str = jade.renderFile('./views/.jade',{pretty:true})
console.log(str)

// 1.根据缩进规定层级
// 2.属性放在()中 ,分隔
//<script src="a.js"></script>
//script(src="a.js")
// 3.内容空格直接往后堆不能


//style
// style="width:200px;height:200px;background:red"
//普通属性写法
//json 
//style={width:'200px',height:'200px',background:'red'}

//class
//普通属性写法
//div(class="left top right")
//数组
//div(class=['left','top','right'])

//模板引擎:生成页面
// 1.jade:破坏式
// 2.ejs:保留式