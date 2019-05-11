const mysql = require('mysql');
module.exports = {
    //创建一个连接池
    createPool(obj){
      return mysql.createPool(obj);
    },
    //默认格式:表+键+值+where/ignore
    //增
    insert(table,keys,values,ignore){
        ignore===true?ignore = ' IGNORE ':ignore=' ';
       
        return 'INSERT'+ignore+'INTO '+table+'('+ keys.join(',')+') VALUES ('+values.join(",")+' WHERE '+where;
      
    },
    //删
    del(table,where){
        if(where){
            return 'DELETE FROM '+table+" WHERE "+where;
        }else{
            //删除全部
            return 'DELETE FROM '+table;
        }
    },
    //改
    update(table,keys,values,where){
        for(let i = 0;i<values.length;i++){
            keys[i] = keys[i]+'='+values[i];
        }
        if(where){
            return 'UPDATE '+table+" SET "+keys.join(",")+' WHERE '+where;
        }else{
            return 'UPDATE '+table+" SET "+keys.join(",")
        }
    },
    //查
    select(table,keys,where){
        //判断是选所有的还是选一部分的
        keys.length === 0?keys = "*":keys = keys.join(',');
        
        if(where){
            return 'SELECT '+keys+' FROM '+table+' WHRER '+where; 
        }else{
            return 'SELECT '+keys+' FROM '+table;
        }
    }


}
