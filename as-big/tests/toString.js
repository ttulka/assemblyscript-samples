const { stringToString, floatToString } = require('..');
const { strictEqual, throws } = require('assert');

strictEqual(stringToString('0'), '0');
strictEqual(stringToString('-0'), '0');
strictEqual(stringToString('1'), '1');
strictEqual(stringToString('-1'), '-1');
strictEqual(stringToString('+1'), '1');
strictEqual(stringToString('-21'), '-21');
strictEqual(stringToString('21'), '21');
strictEqual(stringToString('+21'), '21');
strictEqual(stringToString('-21'), '-21');
strictEqual(stringToString('12.34'), '12.34');
strictEqual(stringToString('+12.34'), '12.34');
strictEqual(stringToString('-12.34'), '-12.34');

strictEqual(stringToString('-1111111111111111111'), '-1111111111111111111');
strictEqual(stringToString('-11111111111111111111'), '-11111111111111111111');
strictEqual(stringToString('-111111111111111111111'), '-111111111111111111111');

strictEqual(stringToString('1000000000000066600000000000001'), '1.000000000000066600000000000001e+30');
strictEqual(stringToString('3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648'), '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648');
strictEqual(stringToString('-3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648'), '-3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648');
strictEqual(stringToString('846541909102172561387687332846574821644339566579018824469183039459849226446955501125839107201482054711184821804953527132285055906448390746603282315680841289760711243528430826899802682604618703295449479028501573993961791488205972383346264832397985356295141.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648'), '8.46541909102172561387687332846574821644339566579018824469183039459849226446955501125839107201482054711184821804953527132285055906448390746603282315680841289760711243528430826899802682604618703295449479028501573993961791488205972383346264832397985356295141141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648e+254');
strictEqual(stringToString('-846541909102172561387687332846574821644339566579018824469183039459849226446955501125839107201482054711184821804953527132285055906448390746603282315680841289760711243528430826899802682604618703295449479028501573993961791488205972383346264832397985356295141.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648'), '-8.46541909102172561387687332846574821644339566579018824469183039459849226446955501125839107201482054711184821804953527132285055906448390746603282315680841289760711243528430826899802682604618703295449479028501573993961791488205972383346264832397985356295141141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648e+254');
strictEqual(stringToString('-0.00002880972004499178518524380571906338098072371970938177432917135459615370973'), '-0.00002880972004499178518524380571906338098072371970938177432917135459615370973');
strictEqual(stringToString('0.00002880972004499178518524380571906338098072371970938177432917135459615370973'), '0.00002880972004499178518524380571906338098072371970938177432917135459615370973');
strictEqual(stringToString('-9951290509.3429612599596526988511098538865484988394'), '-9951290509.3429612599596526988511098538865484988394');
strictEqual(stringToString('3.171194102379077141557759899307946350455841e+27'), '3.171194102379077141557759899307946350455841e+27');
strictEqual(stringToString('-3.171194102379077141557759899307946350455841e+27'), '-3.171194102379077141557759899307946350455841e+27');
strictEqual(stringToString('83.171194102379077141557759899307946350455841e+27'), '8.3171194102379077141557759899307946350455841e+28');
strictEqual(stringToString('-83.171194102379077141557759899307946350455841e+27'), '-8.3171194102379077141557759899307946350455841e+28');
strictEqual(stringToString('0.0011263455635000000000'), '0.0011263455635');
strictEqual(stringToString('-0.0011263455635000000000'), '-0.0011263455635');
strictEqual(stringToString('0.00005599616782279678868859860419000000000000000'), '0.00005599616782279678868859860419');
strictEqual(stringToString('-0.00005599616782279678868859860419000000000000000'), '-0.00005599616782279678868859860419');
strictEqual(stringToString('0.00068986952351457757000000'), '0.00068986952351457757');
strictEqual(stringToString('-0.00068986952351457757000000'), '-0.00068986952351457757');
strictEqual(stringToString('0.00009680000000000000000000'), '0.0000968');
strictEqual(stringToString('-0.00009680000000000000000000'), '-0.0000968');
strictEqual(stringToString('0.000000000000000008542484340200000000000000000000'), '8.5424843402e-18');
strictEqual(stringToString('-0.000000000000000008542484340200000000000000000000'), '-8.5424843402e-18');
strictEqual(stringToString('00162145242000.0'), '162145242000');
strictEqual(stringToString('-00162145242000.0'), '-162145242000');
strictEqual(stringToString('000000000000000000000016214524200000000000.0000000000000'), '16214524200000000000');
strictEqual(stringToString('-000000000000000000000162145242000000000000.0000000000000'), '-162145242000000000000');
strictEqual(stringToString('0000000000000000000000162111111100000000000000000000000000004524200000000000.0000000000000'), '1.621111111000000000000000000000000000045242e+53');
strictEqual(stringToString('-0000000000000000000000162111111100000000000000000000000000004524200000000000.0000000000000'), '-1.621111111000000000000000000000000000045242e+53');

strictEqual(stringToString('0.'), '0');
strictEqual(stringToString('-0.'), '0');
strictEqual(stringToString('0.00000000000000000000000000000'), '0');
strictEqual(stringToString('-0.00000000000000000000000000000'), '0');
strictEqual(stringToString('0000.'), '0');
strictEqual(stringToString('-0000.'), '0');
strictEqual(stringToString('0000000000000000.000000000000000000000000000'), '0');
strictEqual(stringToString('-00000000000000000000000000000.00000000000000000000000000000000'), '0');
strictEqual(stringToString('1.'), '1');
strictEqual(stringToString('-1.'), '-1');
strictEqual(stringToString('1.0'), '1');
strictEqual(stringToString('-1.0'), '-1');
strictEqual(stringToString('1.0000000000000000000'), '1');
strictEqual(stringToString('-1.0000000000000000000'), '-1');
strictEqual(stringToString('12.'), '12');
strictEqual(stringToString('-12.'), '-12');
strictEqual(stringToString('12.0'), '12');
strictEqual(stringToString('-12.0'), '-12');
strictEqual(stringToString('12.000000000000000000000000'), '12');
strictEqual(stringToString('-12.000000000000000000000000'), '-12');
strictEqual(stringToString('0000000000000000000000000000000000012.000000000000000000000000'), '12');
strictEqual(stringToString('-0000000000000000000000000000000000012.000000000000000000000000'), '-12');
strictEqual(stringToString('9876543210.'), '9876543210');
strictEqual(stringToString('-9876543210.'), '-9876543210');
strictEqual(stringToString('.2'), '0.2');
strictEqual(stringToString('-.2'), '-0.2');
strictEqual(stringToString('.34'), '0.34');
strictEqual(stringToString('-.34'), '-0.34');
strictEqual(stringToString('.3486546436461321300065464668000646464654899773321'), '0.3486546436461321300065464668000646464654899773321');
strictEqual(stringToString('-.3486546436461321300065464668000646464654899773321'), '-0.3486546436461321300065464668000646464654899773321');
strictEqual(stringToString('0.e0'), '0');
strictEqual(stringToString('-0.e0'), '0');
strictEqual(stringToString('0.e+4'), '0');
strictEqual(stringToString('-0.e+4'), '0');
strictEqual(stringToString('98.e1'), '980');
strictEqual(stringToString('-98.e1'), '-980');
strictEqual(stringToString('5e-324'), '5e-324');
strictEqual(stringToString('-5e-324'), '-5e-324');
strictEqual(stringToString('5e-325'), '5e-325');
strictEqual(stringToString('-5e-325'), '-5e-325');
strictEqual(stringToString('1.7976931348623157e+308'), '1.7976931348623157e+308');
strictEqual(stringToString('-1.7976931348623157e+308'), '-1.7976931348623157e+308');
strictEqual(stringToString('1.7976931348623157e+309'), '1.7976931348623157e+309');
strictEqual(stringToString('-1.7976931348623157e+309'), '-1.7976931348623157e+309');

strictEqual(stringToString('1.234e+2'), '123.4');
strictEqual(stringToString('1.234e-2'), '0.01234');
strictEqual(stringToString('+1.234e+2'), '123.4');
strictEqual(stringToString('+1.234e-2'), '0.01234');
strictEqual(stringToString('-1.234e+2'), '-123.4');
strictEqual(stringToString('-1.234e-2'), '-0.01234');
strictEqual(stringToString('1e+0'), '1');
strictEqual(stringToString('1e+1'), '10');
strictEqual(stringToString('1e+2'), '100');
strictEqual(stringToString('1e+3'), '1000');
strictEqual(stringToString('1e3'), '1000');
strictEqual(stringToString('1e+4'), '10000');
strictEqual(stringToString('1e+5'), '100000');
strictEqual(stringToString('1e+6'), '1000000');
strictEqual(stringToString('1e+7'), '10000000');
strictEqual(stringToString('1e+8'), '100000000');
strictEqual(stringToString('1e+9'), '1000000000');
strictEqual(stringToString('1e+10'), '10000000000');
strictEqual(stringToString('1e+11'), '100000000000');
strictEqual(stringToString('1e+12'), '1000000000000');
strictEqual(stringToString('1e+13'), '10000000000000');
strictEqual(stringToString('1e+14'), '100000000000000');
strictEqual(stringToString('1e+15'), '1000000000000000');
strictEqual(stringToString('1e+16'), '10000000000000000');
strictEqual(stringToString('1e+17'), '100000000000000000');
strictEqual(stringToString('1e+18'), '1000000000000000000');
strictEqual(stringToString('1e+19'), '10000000000000000000');
strictEqual(stringToString('1e+20'), '100000000000000000000');
strictEqual(stringToString('-1e+20'), '-100000000000000000000');
strictEqual(stringToString('100000000000000000000'), '100000000000000000000');
strictEqual(stringToString('-100000000000000000000'), '-100000000000000000000');
strictEqual(stringToString('-1e21'), '-1e+21');
strictEqual(stringToString('-1e+21'), '-1e+21');
strictEqual(stringToString('1e+21'), '1e+21');
strictEqual(stringToString('1e+22'), '1e+22');
strictEqual(stringToString('1e22'), '1e+22');
strictEqual(stringToString('1.234e+2'), '123.4');
strictEqual(stringToString('1.234e-2'), '0.01234');
strictEqual(stringToString('1e-0'), '1');
strictEqual(stringToString('1e-1'), '0.1');
strictEqual(stringToString('1e-2'), '0.01');
strictEqual(stringToString('1e-3'), '0.001');
strictEqual(stringToString('1e-4'), '0.0001');
strictEqual(stringToString('1e-5'), '0.00001');
strictEqual(stringToString('1e-6'), '0.000001');
strictEqual(stringToString('0.000001'), '0.000001');
strictEqual(stringToString('-1e-6'), '-0.000001');
strictEqual(stringToString('-0.000001'), '-0.000001');
strictEqual(stringToString('-1e-7'), '-1e-7');
strictEqual(stringToString('1e-7'), '1e-7');
strictEqual(stringToString('1e-8'), '1e-8');
strictEqual(stringToString('1e-9'), '1e-9');
strictEqual(stringToString('1e-10'), '1e-10');
strictEqual(stringToString('1e-11'), '1e-11');
strictEqual(stringToString('1e-12'), '1e-12');
strictEqual(stringToString('1e-13'), '1e-13');
strictEqual(stringToString('1e-14'), '1e-14');
strictEqual(stringToString('1e-15'), '1e-15');
strictEqual(stringToString('1e-16'), '1e-16');
strictEqual(stringToString('1e-17'), '1e-17');
strictEqual(stringToString('1e-18'), '1e-18');
strictEqual(stringToString('1e-19'), '1e-19');
strictEqual(stringToString('1e-20'), '1e-20');
strictEqual(stringToString('1e-21'), '1e-21');
strictEqual(stringToString('1e-22'), '1e-22');
strictEqual(stringToString('1.7976931348623157e+308'), '1.7976931348623157e+308');
strictEqual(stringToString('5e-324'), '5e-324');
strictEqual(stringToString('0.00001'), '0.00001');
strictEqual(stringToString('0.000001'), '0.000001');
strictEqual(stringToString('1.2e-8'), '1.2e-8');
strictEqual(stringToString('1.23e-8'), '1.23e-8');
strictEqual(stringToString('153.466306'), '153.466306');

strictEqual(floatToString(123), '123');
strictEqual(floatToString(123.456), '123.456');
strictEqual(floatToString(-123.456), '-123.456');
strictEqual(floatToString(0.456), '0.456');
strictEqual(floatToString(-0.456), '-0.456');
strictEqual(floatToString(1), '1');
strictEqual(floatToString(-1), '-1');
strictEqual(floatToString(0), '0');
strictEqual(floatToString(-0), '0');
strictEqual(floatToString(1.234e+2), '123.4');
strictEqual(floatToString(1e+0), '1');
strictEqual(floatToString(1e+1), '10');
strictEqual(floatToString(1e+2), '100');
strictEqual(floatToString(1e+3), '1000');
strictEqual(floatToString(1e+4), '10000');
strictEqual(floatToString(1e+5), '100000');
strictEqual(floatToString(1e+6), '1000000');
strictEqual(floatToString(1e+7), '10000000');
strictEqual(floatToString(1e+8), '100000000');
strictEqual(floatToString(1e+9), '1000000000');
strictEqual(floatToString(1e+10), '10000000000');
strictEqual(floatToString(1e+11), '100000000000');
strictEqual(floatToString(1e+12), '1000000000000');
strictEqual(floatToString(1e+13), '10000000000000');
strictEqual(floatToString(1e+14), '100000000000000');
strictEqual(floatToString(1e+15), '1000000000000000');
strictEqual(floatToString(1e+16), '10000000000000000');
strictEqual(floatToString(1e+17), '100000000000000000');
strictEqual(floatToString(1e+18), '1000000000000000000');
strictEqual(floatToString(1e+19), '10000000000000000000');
strictEqual(floatToString(1e+20), '100000000000000000000');
strictEqual(floatToString(-1e+20), '-100000000000000000000');
strictEqual(floatToString(100000000000000000000), '100000000000000000000');
strictEqual(floatToString(-100000000000000000000), '-100000000000000000000');
strictEqual(floatToString(-1e+21), '-1e+21');
strictEqual(floatToString(1e+21), '1e+21');
strictEqual(floatToString(1e+22), '1e+22');
strictEqual(floatToString(1.234e+2), '123.4');
strictEqual(floatToString(1.234e-2), '0.01234');
strictEqual(floatToString(1e-0), '1');
strictEqual(floatToString(1e-1), '0.1');
strictEqual(floatToString(1e-2), '0.01');
strictEqual(floatToString(1e-3), '0.001');
strictEqual(floatToString(1e-4), '0.0001');
strictEqual(floatToString(1e-5), '0.00001');
strictEqual(floatToString(1e-6), '0.000001');
strictEqual(floatToString(0.000001), '0.000001');
strictEqual(floatToString(-1e-6), '-0.000001');
strictEqual(floatToString(-0.000001), '-0.000001');
strictEqual(floatToString(-1e-7), '-1e-7');
strictEqual(floatToString(1e-7), '1e-7');
strictEqual(floatToString(1e-8), '1e-8');
strictEqual(floatToString(1e-9), '1e-9');
strictEqual(floatToString(1e-10), '1e-10');
strictEqual(floatToString(1e-11), '1e-11');
strictEqual(floatToString(1e-12), '1e-12');
strictEqual(floatToString(1e-13), '1e-13');
strictEqual(floatToString(1e-14), '1e-14');
strictEqual(floatToString(1e-15), '1e-15');
strictEqual(floatToString(1e-16), '1e-16');
strictEqual(floatToString(1e-17), '1e-17');
strictEqual(floatToString(1e-18), '1e-18');
strictEqual(floatToString(1e-19), '1e-19');
strictEqual(floatToString(1e-20), '1e-20');
strictEqual(floatToString(1e-21), '1e-21');
strictEqual(floatToString(1e-22), '1e-22');
strictEqual(floatToString(1.7976931348623157e+308), '1.7976931348623157e+308');
strictEqual(floatToString(5e-324), '5e-324');
strictEqual(floatToString(0.00001), '0.00001');
strictEqual(floatToString(0.000001), '0.000001');
strictEqual(floatToString(1.2e-8), '1.2e-8');
strictEqual(floatToString(1.23e-8), '1.23e-8');
strictEqual(floatToString(1.23E-8), '1.23e-8');
strictEqual(floatToString(1.23E+8), '123000000');
strictEqual(floatToString(153.466306), '153.466306');

throws(() => stringToString('xyz'));
throws(() => stringToString('x.yz'));
throws(() => stringToString('1.23ee-8'));
throws(() => stringToString('e'));
throws(() => stringToString('.e'));
throws(() => stringToString('.e1'));
throws(() => stringToString('.e+1'));
throws(() => stringToString('.e-1'));
throws(() => stringToString('e1'));
throws(() => stringToString('e-1'));
throws(() => stringToString('e+1'));
throws(() => stringToString('e1e'));
throws(() => stringToString('1e.'));
throws(() => stringToString('+e1'));
throws(() => stringToString('-e1'));
throws(() => stringToString('+e+1'));
throws(() => stringToString('1e1.'));
throws(() => stringToString('1e1.1'));
throws(() => stringToString('e12.34'));
throws(() => stringToString('-e12.34'));
throws(() => stringToString('+e12.34'));
throws(() => stringToString('1-1'));
throws(() => stringToString('1+1'));
throws(() => stringToString('1.2.3'));