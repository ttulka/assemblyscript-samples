export function invert(width: i32, height: i32): void {
  for (let i = 0; i < width * height * 4; i += 4 /*rgba*/) {    
    const r = load<u8>(i);
    const g = load<u8>(i + 1);
    const b = load<u8>(i + 2);

    store<u8>(i,     255 - r);
    store<u8>(i + 1, 255 - g);
    store<u8>(i + 2, 255 - b);
  }
}

export function grayscale(width: i32, height: i32): void {
  for (let i = 0; i < width * height * 4; i += 4 /*rgba*/) {
    const r = load<u8>(i);
    const g = load<u8>(i + 1);
    const b = load<u8>(i + 2);
    
    const gray = u8(r * 0.2126 + g * 0.7152 + b * 0.0722);

    store<u8>(i,     gray);
    store<u8>(i + 1, gray);
    store<u8>(i + 2, gray);
  }
}

export function basicMonochrome(width: i32, height: i32, threshold: u8): void {
  for (let i = 0; i < width * height * 4; i += 4 /*rgba*/) {
    const r = load<u8>(i);
    const g = load<u8>(i + 1);
    const b = load<u8>(i + 2);
    
    const gray = r * 0.2126 + g * 0.7152 + b * 0.0722;

    const mono = threshold > gray ? 0 : 255;

    store<u8>(i,     mono);
    store<u8>(i + 1, mono);
    store<u8>(i + 2, mono);
  }
}

export function randomMonochrome(width: i32, height: i32, offset: u8): void {
  for (let i = 0; i < width * height * 4; i += 4 /*rgba*/) {
    const r = load<u8>(i);
    const g = load<u8>(i + 1);
    const b = load<u8>(i + 2);
    
    const gray = r * 0.2126 + g * 0.7152 + b * 0.0722;

    const threshold = Math.random() * (255 - offset * 2) + offset;
    const mono = threshold > gray ? 0 : 255;

    store<u8>(i,     mono);
    store<u8>(i + 1, mono);
    store<u8>(i + 2, mono);
  }
}