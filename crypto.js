'use strict'
//crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能,但速度会非常慢。Node.js用C/C++实现这些算法后,通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快
const crypto = require('crypto');

//MD5和SHA1
const hash = crypto.createHash('md5');

//可任意多次调用update()
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

//获取签名,hex是结果输出模式
//console.log(hash.digest('hex'));
//7e1977739c748beac0c0fd14fd26a544

//update()方法默认字符串编码为UTF-8,也可以传入Buffer
//如果要计算SHA1,只需要把md5改成sha1，就可以得到SHA1的结果
//还可以使用更安全的 sha256 和 sha512

//Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥

const hmac = crypto.createHmac('sha256','secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!')


//console.log(hmac.digest('hex'));
//只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数增强的哈希算法

//AES
//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用

function aesEncrypt(data,key){
    //使用指定的算法和密钥创建并返回一个cipher对象。
    const cipher = crypto.createCipher('aes192',key);
    //使用参数data更新要加密的内容，其编码方式由参数input_encoding指定，可以为 'utf8', 'ascii'或者'binary'。参数output_encoding指定了已加密内容的输出编码方式，可以为 'binary', 'base64'或'hex'。
    var crypted = cipher.update(data,'utf8','hex');
    //返回所有剩余的加密内容，output_encoding输出编码为'binary', 'ascii'或'utf8'其中之一。
    crypted =cipher.final('hex');
    return crypted;
}
function aesDecrypt(encrypted,key){
    //使用给定的算法和密钥创建并返回一个解密对象。该对象为上述加密对象的反向运算。
    const decipher = crypto.createDecipher('aes192',key);
    //使用参数data更新要解密的内容，其编码方式为'binary'，'base64'或'hex'。参数output_encoding指定了已解密的明文内容的输出编码方式，可以为 'binary'，'ascii'或'utf8'。
    var decrypted = decipher.update(encrypted,'hex','utf8');
    //返回全部剩余的已解密的明文，其output_encoding' 为'binary', 'ascii'或'utf8'`其中之一。
    decrypted +=decipher.final('utf8');
    return decrypted;
}
var data = 'Hello, this is a secret message!'
var key = 'Password!';
var encrypted = aesEncrypt(data,key);
var decrypted = aesDecrypt(encrypted,key);

console.log('Plain text:'+data);
console.log('Encrypted text:'+encrypted);
console.log('Decrypted text:'+decrypted);

//DH算法：一种密钥交换协议，密钥是双法国协商计算出来的

//小明的密钥
// var ming = crypto.createDiffieHellman(512);
// var ming_keys =ming.generateKeys();

// var prime = ming.getPrime();
// var generator = ming.getGenerator();

// console.log('Prime::'+prime.toString('hex'));
// console.log('Generator:'+generator.toString('hex'));

// //小红的密钥
// var hong = crypto.creareDiffieHellman(prime,generator);
// var hong_keys = hong.generateKeys();
 
// //exchange and generate secret;
// var ming_secret = ming.computeSecret(hong_keys);
// var hong_secret = hong.computeSecret(ming_Keys);

// //print secret:
// console.log('Secret of Xiao Ming:'+ming_secret.toString('hex'));
// console.log('Secret of Xiao Hong:'+hong_secret.toString('hex'));

