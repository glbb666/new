var testVar="This is a variable from testModule.js.";
console.log(testVar);

exports.testVar =testVar;
if(module === require.main) {
    console.log('This is the main module of application.');
  }