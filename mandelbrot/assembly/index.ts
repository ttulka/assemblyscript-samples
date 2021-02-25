export function mandelbrot(
    width: i32, height: i32, maxIterations: i32, 
    rMagnitude: u32, gMagnitude: u32, bMagnitude: u32): void {

  const MAX_ITERATIONS = maxIterations || 1000;

  const R_MAGNITUDE = min(max(rMagnitude || 7, 1), 10);
  const G_MAGNITUDE = min(max(gMagnitude || 2, 1), 10);
  const B_MAGNITUDE = min(max(bMagnitude || 4, 1), 10);

  const MAX_MAGNITUDE = Math.log(MAX_ITERATIONS) * 3;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<f64>(<f64>px, 0.0, <f64>width, -2.15, 1.15);
      const y0 = scaleValue<f64>(<f64>py, 0.0, <f64>height, -1.25, 1.25);

      let x = 0.0;
      let y = 0.0;
      let iteration = 0;

      let x2 = 0.0;
      let y2 = 0.0;
      let w = 0.0;

      while (x2 + y2 <= 4 && iteration < MAX_ITERATIONS) {
        x = x2 - y2 + x0;
        y = w - x2 - y2 + y0;
        x2 = x * x;
        y2 = y * y;
        w = (x + y) * (x + y);
        iteration++;
      }

      const r = scaleValue<f64>(Math.log(iteration) * R_MAGNITUDE, 0, MAX_MAGNITUDE, 0, 255);
      const g = scaleValue<f64>(Math.log(iteration) * G_MAGNITUDE, 0, MAX_MAGNITUDE, 0, 255);
      const b = scaleValue<f64>(Math.log(iteration) * B_MAGNITUDE, 0, MAX_MAGNITUDE, 0, 255);

      // memory index
      const i = (px + py * width) * 4 /*rgb*/;
      
      store<u8>(i,     r as u8);
      store<u8>(i + 1, g as u8);
      store<u8>(i + 2, b as u8);
      store<u8>(i + 3, 255);
    }
  }
}

function scaleValue<T extends number>(value: T, from0: T, from1: T, to0: T, to1: T): T {
	return ((value - from0) / (from1 - from0)) * (to1 - to0) + to0;
}