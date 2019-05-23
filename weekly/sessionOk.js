/*
    这是一个判断session是否存在的中间件
*/
module.exports = function(){
    return function(req, res, next) {
        if (!req.session['id']) {
            res.send(JSON.stringify({
                msg:"未登录",
                code:1000,
                success:false
            }));
        } else {
            next();
        }
    }   
}