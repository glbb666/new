const mysql = require('mysql');
module.exports = {
    poolPromise(pool,sql){
        //判断是不是数组，是数组就用Promise.all
        let promise;
        if(sql instanceof Array){
            promise = sql.map(function(id){
                let p = new Promise(function(resolve,reject){
                    pool.query(id,(err,result)=>{
                        // console.log(id);
                        if(err) return reject(err);
                        resolve(result); 
                    })
                })
                return p;
            })
        }else{
            promise = new Promise(function(resolve,reject){
                pool.query(sql,(err,result)=>{
                    if(err) return reject(err);
                    resolve(result); 
                })
            })
        }
        return promise;
    } 
}
