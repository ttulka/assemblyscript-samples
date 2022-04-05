@external("env", "console.log")
declare function print(n: i32): void;

export function main(): void {
  print(42);
}

export function hello(name: string): string {
  return "Hello, " + name + "!";
}

export function multiply(matrix: Int32Array, x: i32): Int32Array {
  var arr = new Int32Array(matrix.length);
  for (var i = 0; i < matrix.length; i++) {
    arr[i] = matrix[i] * x;
  }
  return arr;
}