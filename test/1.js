function jsonp(url,params,callback,time){
    //构造一个函数到window上
    var body = document.body;
    var fnName = "_jsonpFn"+Math.random().toString().replace(".","");
    window[fnName] = function(data){    //发回数据回调的内容
        callback(data);//用户写的函数
        //执行完毕之后,删除该函数
        delete window[fnName];
        body.removeChild(script);
    };

    //创建动态标签
    var script = document.createElement('script')
    //这里的script和img一样，都有能力不受限制的从其他域加载资源,在加载的时候，就会向服务器发起请求
    let str=''
    for(let key in params){
        str+=key+"="+params[key]+"&";
    }
    // console.log(str);
    str+='callback='+fnName;
    script.src = url+'?'+str;
    //先绑定函数再请求
    

    body.insertBefore(script,document.body.firstChild);
    //设置超时处理
    if(time){
        var timer = window.setTimeout(function(){
            //jsonp的超时处理，移除回调函数
            body.removeChild(script);
            clearTimeout(timer);
        },time)
    }
}
