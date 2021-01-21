declare function print(n: i32): void;

export function main(): void {
  print(42);
}


export function hello(
    name: string): string {

  return "Hello, " + name + "!";
}
