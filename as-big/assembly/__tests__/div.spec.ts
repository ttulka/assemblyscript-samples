import Big from '../Big';

function div(a: string, b: string): string {
  return Big.of(a).div(b).toString();
}

describe('div', () => {

  expect<string>(div('2', '2')).toStrictEqual('1');
  expect<string>(div('1', '1')).toStrictEqual('1');
  expect<string>(div('-1', '1')).toStrictEqual('-1');
  expect<string>(div('1', '-1')).toStrictEqual('-1');
  expect<string>(div('-1', '-1')).toStrictEqual('1');
  expect<string>(div('10', '-2')).toStrictEqual('-5');
  expect<string>(div('0.00000', '1.000000')).toStrictEqual('0');
  expect<string>(div('1', '1')).toStrictEqual('1');
  expect<string>(div('1', '-45')).toStrictEqual('-0.02222222222222222222');
  expect<string>(div('1', '22')).toStrictEqual('0.04545454545454545455');
  expect<string>(div('1', '0144')).toStrictEqual('0.00694444444444444444');
  expect<string>(div('1', '6.1915')).toStrictEqual('0.16151174997981103125');
  expect<string>(div('1', '-1.02')).toStrictEqual('-0.98039215686274509804');
  expect<string>(div('1', '0.09')).toStrictEqual('11.11111111111111111111');
  expect<string>(div('1', '-0.0001')).toStrictEqual('-10000');
  expect<string>(div('1', '8e5')).toStrictEqual('0.00000125');
  expect<string>(div('1', '9E12')).toStrictEqual('1.1111111e-13');
  expect<string>(div('1', '1e-14')).toStrictEqual('100000000000000');
  expect<string>(div('1', '3.345E-9')).toStrictEqual('298953662.1823617339312406577');
  expect<string>(div('1', '-345.43e+4')).toStrictEqual('-2.8949425353907e-7');
  expect<string>(div('1', '-94.12E+0')).toStrictEqual('-0.01062473438164045899');
  expect<string>(div('0', '0.001')).toStrictEqual('0');
  expect<string>(div('0', '111.1111111110000')).toStrictEqual('0');
  expect<string>(div('-1', '1')).toStrictEqual('-1');
  expect<string>(div('-0.01', '0.01')).toStrictEqual('-1');
  expect<string>(div('54', '-54')).toStrictEqual('-1');
  expect<string>(div('9.99', '-9.99')).toStrictEqual('-1');
  expect<string>(div('0.00023432495704937', '-0.00023432495704937')).toStrictEqual('-1');
  expect<string>(div('100', '100')).toStrictEqual('1');
  expect<string>(div('-999.99', '0.01')).toStrictEqual('-99999');
  expect<string>(div('03.333', '-4')).toStrictEqual('-0.83325');
  expect<string>(div('-1', '-0.1')).toStrictEqual('10');
  expect<string>(div('43534.5435', '0.054645')).toStrictEqual('796679.35767224814713148504');
  expect<string>(div('99999', '1')).toStrictEqual('99999');
  expect<string>(div('-77.8', '1607106515700545211')).toStrictEqual('-4.841e-17');
  expect<string>(div('0.100000000000000000000000000000000', '1')).toStrictEqual('0.1');
  expect<string>(div('0.100000000000000000000000000000000', '-1')).toStrictEqual('-0.1');
  expect<string>(div('0.1000000000000000000000000000000001', '1')).toStrictEqual('0.1');
  expect<string>(div('-0.1000000000000000000000000000000001', '1')).toStrictEqual('-0.1');
  expect<string>(div('0', '1')).toStrictEqual('0');
  expect<string>(div('0.0', '1')).toStrictEqual('0');
  expect<string>(div('0.1', '1')).toStrictEqual('0.1');
  expect<string>(div('-0.1', '1')).toStrictEqual('-0.1');
  expect<string>(div('1e-50', '1')).toStrictEqual('0');
  expect<string>(div('1e-50', '-1')).toStrictEqual('0');
  expect<string>(div('1', '4')).toStrictEqual('0.25');
  expect<string>(div('0.25', '1')).toStrictEqual('0.25');
  expect<string>(div('5.5651e-1', '-3.6e+0')).toStrictEqual('-0.15458611111111111111');
  expect<string>(div('3.6651465e+4', '-6.2211e-8')).toStrictEqual('-589147658774.17177026570863673627');
  expect<string>(div('2', '3')).toStrictEqual('0.66666666666666666667');

  const defDP = Big.DP;

  Big.DP = 100;
  expect<string>(div('2', '3')).toStrictEqual('0.6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666667');
  Big.DP = 33;
  expect<string>(div('6.0408e+4', '-1.04310038966e+11')).toStrictEqual('-5.7911971463925989230753558e-7');
  Big.DP = 30;
  expect<string>(div('-3e+0', '-1.67234861806e+11')).toStrictEqual('1.793884341818714583e-11');
  Big.DP = 5;
  expect<string>(div('-6.2163189e+0', '-3.90185509384e+9')).toStrictEqual('0');
  Big.DP = 5;
  expect<string>(div('-1.71427920814e+10', '-3.7e+0')).toStrictEqual('4633187049.02703');

  Big.DP = defDP;
});