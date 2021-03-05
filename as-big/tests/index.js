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
    'round'
    
].forEach(method => require('./' + method));

console.log('tests ok');
