import Big from './big';

export function stringToString(n: string): string {
  return Big.of(n).toString();
}

export function floatToString(n: f64): string {
  return Big.of(n).toString();
}

export function stringToNumber(n: string): f64 {
  return Big.of(n).toNumber();
}

export function floatToNumber(n: f64): f64 {
  return Big.of(n).toNumber();
}

export function cmp(a: string, b: string): i32 {
  return Big.of(a).cmp(Big.of(b));
}

export function plus(a: string, b: string): string {
  return (Big.of(a) + Big.of(b)).toString();
}

export function minus(a: string, b: string): string {
  return (Big.of(a) - Big.of(b)).toString();
}
