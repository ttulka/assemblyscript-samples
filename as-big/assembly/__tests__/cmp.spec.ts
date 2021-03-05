import Big from '../Big';

function cmp(a: string, b: string): i8 {
  return Big.of(a).cmp(b);
}

describe('cmp', () => {

  expect<i8>(cmp('0', '0')).toStrictEqual(0);
  expect<i8>(cmp('-0', '0')).toStrictEqual(0);
  expect<i8>(cmp('0', '-0')).toStrictEqual(0);
  expect<i8>(cmp('-0', '-0')).toStrictEqual(0);
  expect<i8>(cmp('1', '1')).toStrictEqual(0);
  expect<i8>(cmp('-1', '1')).toStrictEqual(-1);
  expect<i8>(cmp('1', '-1')).toStrictEqual(1);
  expect<i8>(cmp('-1', '-1')).toStrictEqual(0);
  expect<i8>(cmp('123', '123')).toStrictEqual(0);
  expect<i8>(cmp('-123', '123')).toStrictEqual(-1);
  expect<i8>(cmp('123', '-123')).toStrictEqual(1);
  expect<i8>(cmp('-123', '-123')).toStrictEqual(0);

  expect<i8>(cmp('5e-324', '0')).toStrictEqual(1);
  expect<i8>(cmp('0', '5e-324')).toStrictEqual(-1);

  expect<i8>(cmp('1', '2')).toStrictEqual(-1);
  expect<i8>(cmp('-1', '2')).toStrictEqual(-1);
  expect<i8>(cmp('1', '-2')).toStrictEqual(1);
  expect<i8>(cmp('-1', '-2')).toStrictEqual(1);
  expect<i8>(cmp('2', '1')).toStrictEqual(1);
  expect<i8>(cmp('-2', '1')).toStrictEqual(-1);
  expect<i8>(cmp('2', '-1')).toStrictEqual(1);
  expect<i8>(cmp('-2', '-1')).toStrictEqual(-1);

  expect<i8>(cmp(Number.MAX_VALUE.toString(), Number.MAX_VALUE.toString())).toStrictEqual(0);
  expect<i8>(cmp(Number.MIN_VALUE.toString(), Number.MIN_VALUE.toString())).toStrictEqual(0);
  expect<i8>(cmp(Number.MAX_VALUE.toString(), Number.MIN_VALUE.toString())).toStrictEqual(1);
  expect<i8>(cmp(Number.MIN_VALUE.toString(), Number.MAX_VALUE.toString())).toStrictEqual(-1);

  expect<i8>(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628')).toStrictEqual(0);
  expect<i8>(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998627')).toStrictEqual(1);
  expect<i8>(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998629')).toStrictEqual(-1);

  expect<i8>(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628')).toStrictEqual(0);
  expect<i8>(cmp('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '2.141592653589793238462643383279502884197169399375105820974944592307816406286208998628')).toStrictEqual(1);
  expect<i8>(cmp('4.141592653589793238462643383279502884197169399375105820974944592307816406286208998628', '5.141592653589793238462643383279502884197169399375105820974944592307816406286208998628')).toStrictEqual(-1);
});