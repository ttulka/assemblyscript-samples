export declare function callback(index: i32, r: i32, g: i32, b: i32): void;

export function mandelbrot(
    width: i32, height: i32, maxIterations: i32, 
    rMagnitude: u32, gMagnitude: u32, bMagnitude: u32,
    offsetX: u32, offsetY: u32, zoom: f32): void {

  const MAX_ITERATIONS = maxIterations || 1000;

  const R_MAGNITUDE = rMagnitude || 7;
  const G_MAGNITUDE = gMagnitude || 2;
  const B_MAGNITUDE = bMagnitude || 4;

  const MAX_MAGNITUDE = Math.log(MAX_ITERATIONS) * Math.PI;

  const OFFSET_X = offsetX || 0;
  const OFFSET_Y = offsetY || 0;
  const ZOOM = zoom || 1.0;
  
  const X1 = -2.15, X2 = 1.15;
  const Y1 = -1.25, Y2 = 1.25;

  const RATIO_X = (-1.0 * X1 + X2) / width;
  const RATIO_Y = (-1.0 * Y1 + Y2) / height;

  const OFFSET_X_ = OFFSET_X * RATIO_X;
  const OFFSET_Y_ = OFFSET_Y * RATIO_Y;
  
  const X1_ = X1 + OFFSET_X_, X2_ = X1_ + <f32>width * ZOOM * RATIO_X;
  const Y1_ = Y1 + OFFSET_Y_, Y2_ = Y1_ + <f32>height * ZOOM * RATIO_Y;
  
  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<f64>(<f64>px, 0.0, <f64>width, X1_, X2_);
      const y0 = scaleValue<f64>(<f64>py, 0.0, <f64>height, Y1_, Y2_);

      let x = 0.0;
      let y = 0.0;
      let iteration = 0;

      while (x * x + y * y <= 4 && iteration < MAX_ITERATIONS) {
        const temp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = temp;
        iteration++;
      }

      const r = scaleValue<f64>(Math.log(iteration) * R_MAGNITUDE, 0, MAX_MAGNITUDE, 0, 255);
      const g = scaleValue<f64>(Math.log(iteration) * G_MAGNITUDE, 0, MAX_MAGNITUDE, 0, 255);
      const b = scaleValue<f64>(Math.log(iteration) * B_MAGNITUDE, 0, MAX_MAGNITUDE, 0, 255);

      // memory index
      const i = (px + py * width) * 4 /*rgb*/;

      callback(i, r as u8, g as u8, b as u8);; 
    }
  }
}

function scaleValue<T extends number>(value: T, from0: T, from1: T, to0: T, to1: T): T {
	return ((value - from0) / (from1 - from0)) * (to1 - to0) + to0;
}