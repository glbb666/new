console.log(
    "This is a test string."
    );
console.time('small loop');    
// console.error("This is anerror string.");
console.warn("this is a warn");
for(i = 0;i<100000;i++){
    ;
}
console.timeEnd('small loop');
// console.trace('trace');
console.assert(1==false,'error');