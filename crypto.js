'use strict'
//crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能,但速度会非常慢。Node.js用C/C++实现这些算法后,通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快
const crypto = require('crypto');



//MD5和SHA1
const hash = crypto.createHash('md5');

//可任意多次调用update()
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

//获取签名
console.log(hash.digest('hex'));
//7e1977739c748beac0c0fd14fd26a544

//update()方法默认字符串编码为UTF-8,也可以传入Buffer
//如果要计算SHA1,只需要把md5改成sha1，就可以得到SHA1的结果
//还可以使用更安全的 sha256 和 sha512

//Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥

const hmac = crypto.createHmac('sha256','secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!')

console.log(hmac.digest('hex'));
//只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数增强的哈希算法

//AES
//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用

function aesEncrypt(data,key){
    const cipher = crypto.createCipher('aes192',key);
    var crypted = cipher.update(data,'utf8','hex');
}

