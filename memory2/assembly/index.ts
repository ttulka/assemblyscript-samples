store<u8>(0, 42);

export function updateMemory(): void {
  const val = load<u8>(0);
  store<u8>(1, val * 2);
}
