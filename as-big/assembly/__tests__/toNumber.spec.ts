import Big from '../Big';

function toNumber(n: string): number {
  return Big.of(n).toNumber();
}

describe('toNumber', () => {

  expect<number>(toNumber('0')).toStrictEqual(0);
  expect<number>(toNumber('1')).toStrictEqual(1);
  expect<number>(toNumber('1.23')).toStrictEqual(1.23);
  expect<number>(toNumber('123')).toStrictEqual(123);
  expect<number>(toNumber('12.345')).toStrictEqual(12.345);
  expect<number>(toNumber('-0')).toStrictEqual(0);
  expect<number>(toNumber('-1')).toStrictEqual(-1);
  expect<number>(toNumber('-1.23')).toStrictEqual(-1.23);
  expect<number>(toNumber('-123')).toStrictEqual(-123);
  expect<number>(toNumber('-12.345')).toStrictEqual(-12.345);

  expect<number>(toNumber(Number.MAX_VALUE.toString())).toStrictEqual(Number.MAX_VALUE);
  expect<number>(toNumber(Number.MIN_VALUE.toString())).toStrictEqual(Number.MIN_VALUE);
  expect<number>(toNumber(Number.MAX_SAFE_INTEGER.toString())).toStrictEqual(Number.MAX_SAFE_INTEGER);
  expect<number>(toNumber(Number.MIN_SAFE_INTEGER.toString())).toStrictEqual(Number.MIN_SAFE_INTEGER);

  expect<number>(toNumber('5e-324')).toStrictEqual(5e-324);
  expect<number>(toNumber('-5e-323')).toStrictEqual(-5e-323);
  expect<number>(toNumber('1.7976931348623157e+308')).toStrictEqual(1.7976931348623157e+308);
  expect<number>(toNumber('-1.7976931348623157e+306')).toStrictEqual(-1.7976931348623157e+306);

  expect<number>(toNumber('-1e+0')).toStrictEqual(-1);
  expect<number>(toNumber('-1e-0')).toStrictEqual(-1);

  expect<number>(toNumber('123.456789876543')).toStrictEqual(123.456789876543);
  expect<number>(toNumber('-123.456789876543')).toStrictEqual(-123.456789876543);
  expect<number>(toNumber('1.110223024625155e-16')).toStrictEqual(1.110223024625155e-16);
  expect<number>(toNumber('-1.110223024625155e-16')).toStrictEqual(-1.110223024625155e-16);
  expect<number>(toNumber('9007199254740991')).toStrictEqual(9007199254740991);
  expect<number>(toNumber('-9007199254740991')).toStrictEqual(-9007199254740991);
  expect<number>(toNumber('5e-324')).toStrictEqual(5e-324);
  expect<number>(toNumber('1.7976931348623157e+308')).toStrictEqual(1.7976931348623157e+308);
  expect<number>(toNumber('0.00999')).toStrictEqual(0.00999);
  expect<number>(toNumber('123.456789')).toStrictEqual(123.456789);
  expect<number>(toNumber('1.23456789876543')).toStrictEqual(1.23456789876543);
  expect<number>(toNumber('123.456789876543')).toStrictEqual(123.456789876543);
  expect<number>(toNumber('-123.456789876543')).toStrictEqual(-123.456789876543);
  expect<number>(toNumber('1.1102230246251564e-16')).toStrictEqual(1.1102230246251564e-16);
  expect<number>(toNumber('-1.1102230246251564e-16')).toStrictEqual(-1.1102230246251564e-16);
  expect<number>(toNumber('9007199254740991')).toStrictEqual(9007199254740991);
  expect<number>(toNumber('-9007199254740991')).toStrictEqual(-9007199254740991);
  expect<number>(toNumber('5e-324')).toStrictEqual(5e-324);
  expect<number>(toNumber('1.7976931348623157e+308')).toStrictEqual(1.7976931348623157e+308);
  expect<number>(toNumber('0.00999')).toStrictEqual(0.00999);
  expect<number>(toNumber('123.456789')).toStrictEqual(123.456789);
  expect<number>(toNumber('1.23456789876543')).toStrictEqual(1.23456789876543);

  // throws(() => stringToNumber('5e-325'));
  // throws(() => stringToNumber('-5e-325'));
  // throws(() => stringToNumber('1.7976931348623157e+309'));
  // throws(() => stringToNumber('-1.7976931348623157e+309'));
  // throws(() => stringToNumber('123.797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157'));
  // throws(() => stringToNumber('-123.797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157'));
  // throws(() => stringToNumber('12379769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315.7'));
  // throws(() => stringToNumber('-12379769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315779769313486231577976931348623157797693134862315.7'));
});