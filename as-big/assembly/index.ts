import Big from './big';

export function toNumber(n: f64): f64 {
  return Big.ofNumber(n).toNumber();
}

export function toStr(n: f64): string {
  return Big.ofNumber(n).toString();
}

export function add(a: f64, b: f64): f64 {
  return a + b;
} 
