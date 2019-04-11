buf = new Buffer(128)

buf.length
buf.fill(1,10)
buf.fill(2,20,30)
buf = new Buffer([1,2,3])
buf = new Buffer('你好')
buf = new Buffer('你好','ascii')
buf = new Buffer('你好','utf16le')
buf = new Buffer('你好','hex')
buf = new Buffer('你好','base64')
str = '我喜爱编程'
str[2] = '欢'
str
buf = new Buffer(str)
buf[2] = 0
 buf
buf.slice(2,5)
let subBuf = buf.slice(2,5)
subBuf
subBuf[1] = 2
subBuf
buf
/呲牙
/呲牙
/呲牙
/呲牙
/呲牙
/呲牙
/呲牙
/呲牙
/呲牙
buf = new Buffer('我喜爱编程')
buf.toString('utf8',9,12)
buf.toString('utf8',8,12)
buf.toString('utf8',12,buf.length)
buf.toString('utf8',12,buf.length-1)
buf.toString('utf8',0,2)
buf.toString('utf8',0,1)
buf.toString('utf8',0,3)
 buf.write('热',3,3)
buf.toString()
buf.toString('utf8',3,5)
buf.toString('utf8',3,6)
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8')
decoder.write(buf)
 str1 = buf.slice(0,5)
str2 = buf.slice(5,buf.length)
str2
decoder.write(str1)
decoder.write(str2)
str1.toString()
str2.toString()
Buffer.concat([str1,str2])
Buffer.concat([str1,str2]).toString()
buf
buf.readUInt8(0)
buf.readInt8(0)

buf.readUInt8(14,true)
buf.writeUInt8(128,0)
buf
buf.writeUInt8(80,2)
buf
buf.writeUInt8(255,2)
buf
JSON.stringify(buf)
JSON.parse(JSON.stringify(buf))
buf = new Buffer('我喜爱编程')
let json = JSON.stringify(buf)
json
JSON.parse(json)
let copy = new Buffer(JSON.parse(json))
copy.toString()
a = new Buffer ('我喜爱编程')
b = Buffer(128)
a.copy(b,10)
a
b
str
Buffer.isBuffer(str)
Buffer.isBuffer(buf)
buf
Buffer.byteLength(str)
Buffer.byteLength(str,'utf16le')
buf = new Buffer('我喜爱编程','utf16le')
