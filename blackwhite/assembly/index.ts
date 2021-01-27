declare function print(n: i32): void;

export function invert(width: i32, height: i32): void {
  print(width);
  print(height);

  for (let i = 0; i < width * height * 4; i += 4 /*rgba*/) {    
    store<u8>(
      i,
      u8(255 - load<u8>(i))
    );
    store<u8>(
      i + 1,
      255 - load<u8>(i + 1)
    );
    store<u8>(
      i + 2,
      255 - load<u8>(i + 2)
    );

    /*
    data[i]     = 255 - data[i];     // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
    */
  }
}