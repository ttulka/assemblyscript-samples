[
    'toString',
    'toNumber',
    'cmp',
    'plus',
    'minus',
    'times',
    'div',
    'abs',
    'round'
    
].forEach(method => require('./' + method));

console.log('tests ok');
