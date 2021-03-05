[
    'toString',
    'toNumber',
    'cmp',
    'plus',
    'minus',
    'times',
    'div',
    'mod',
    'abs',
    'round'
    
].forEach(method => require('./' + method));

console.log('tests ok');
