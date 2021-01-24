const assert = require("assert");
const {
  hello,
  __newString, __getString,
  __retain, __release
} = require("..");


var pti = __retain(__newString("Tomas"));
var pto = hello(pti);
var str = __getString(pto);
__release(pti);
__release(pto);

assert.equal(str, "Hello, Tomas!");