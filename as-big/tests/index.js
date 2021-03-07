const { 
    stringToString,
    floatToString,
    stringToNumber,
    floatToNumber,
    abs,
    cmp,
    plus,
    minus,
    times,
    div,
    divDP,
    mod,
    pow,
    round,
    prec,
    Big,
    __getString, __newString } = require('..');

// convenient functions for tests
module.exports = {
  stringToString: n => __getString(stringToString(__newString(n))),
  floatToString: n => __getString(floatToString(n)),
  stringToNumber: n => stringToNumber(__newString(n)),
  floatToNumber: n => floatToNumber(n),
  abs: n => __getString(abs(__newString(n))),
  cmp: (a, b) => cmp(__newString(a), __newString(b)),
  round: (n, dp = 0, rm = 1) => __getString(round(__newString(n), dp, rm)),
  prec: (n, sd, rm = 1) => __getString(prec(__newString(n), sd, rm)),
  plus: (a, b) => __getString(plus(__newString(a), __newString(b))),
  minus: (a, b) => __getString(minus(__newString(a), __newString(b))),
  times: (a, b) => __getString(times(__newString(a), __newString(b))),
  div: (a, b) => __getString(div(__newString(a), __newString(b))),
  divDP: (a, b, dp) => __getString(divDP(__newString(a), __newString(b), dp)),
  mod: (a, b) => __getString(mod(__newString(a), __newString(b))),
  pow: (n, x) => __getString(pow(__newString(n), x))
};

[
    'toString',
    'toNumber',
    'cmp',
    'plus',
    'minus',
    'times',
    'div',
    'mod',
    'pow',
    'abs',
    'round',
    'prec'
    
].forEach(method => require('./' + method));

console.log('tests ok');
