@external("env", "console.log")
declare function print(n: i32): void;

export function main(): void {
  print(42);
}