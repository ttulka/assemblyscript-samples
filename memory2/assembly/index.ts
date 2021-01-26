store<u8>(0, 42);
store<u8>(1, 2);

export function updateMemory(): void {
  const val = load<u8>(0);
  const mul = load<u8>(1);
  store<u8>(2, val * mul);
}
