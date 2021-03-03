import Big from './big';

export function stringToString(n: string): string {
  return Big.ofString(n).toString();
}

export function floatToString(n: f64): string {
  return Big.ofNumber(n).toString();
}

export function stringToNumber(n: string): f64 {
  return Big.ofString(n).toNumber();
}

export function floatToNumber(n: f64): f64 {
  return Big.ofNumber(n).toNumber();
}

export function cmp(a: string, b: string): i32 {
  return Big.ofString(a).cmp(Big.ofString(b));
}

export function plus(a: string, b: string): string {
  return Big.ofString(a).plus(Big.ofString(b)).toString();
}
