export function convertToGrayscale(width: i32, height: i32): void {

  const len = width * height * 4;

  for (let i = 0; i < len; i += 4 /*rgba*/) {
    const r = load<u8>(i);
    const g = load<u8>(i + 1);
    const b = load<u8>(i + 2);
    
    const gray = u8(
      r * 0.2126 + g * 0.7152 + b * 0.0722);

    store<u8>(i,     gray);
    store<u8>(i + 1, gray);
    store<u8>(i + 2, gray);
  }
}
