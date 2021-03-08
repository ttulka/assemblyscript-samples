// The entry file of your WebAssembly module.

export function doSomething(): void {
  const arr = new Array<i32>(1);
  arr[-1] = 1;
}
