const assert = require("assert");
const index = require("..");

assert.equal(index.inc(1), 2);

assert.equal(index.sayHello("Test"), "Hello, Test!");

console.log('tests ok');
