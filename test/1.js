function a(response){
    alert("you're at IP address "+response.ip+",which is in "+response.city+","+response.region_name)
};
var script = document.createElement('script')
//这里的script和img一样，都有能力不受限制的从其他域加载资源,在加载的时候，就会向服务器发起请求
script.src = "http://localhost:8080/user/?callback=a";
document.body.insertBefore(script,document.body.firstChild);
var timer = window.setTimeout(function(){
    //jsonp的超时处理，移除回调函数
    document.body.removeChild(script);
    clearTimeout(timer);
},3000)