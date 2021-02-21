export function mandelbrot(width: i32, height: i32, maxIterations: i32): void {
  const MAX_ITERATIONS = maxIterations || 255;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<f64>(<f64>px, 0.0, <f64>width, -2.15, 1.15);
      const y0 = scaleValue<f64>(<f64>py, 0.0, <f64>height, -1.25, 1.25);

      let x = 0.0;
      let y = 0.0;
      let iteration = 0;

      while (x*x + y*y <= 4 && iteration < MAX_ITERATIONS) {
        const temp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = temp;
        iteration++;
      }

      const r = <u8>(iteration / 0.15 % 255);
      const g = <u8>(iteration / 0.25 % 255);
      const b = <u8>(iteration / 0.75 % 255);

      // memory index
      const i = (px + py * width) * 4 /*rgb*/;
      
      store<u8>(i,     r);
      store<u8>(i + 1, g);
      store<u8>(i + 2, b);
      store<u8>(i + 3, 255);
    }
  }
}

function scaleValue<T extends number>(value: T, from0: T, from1: T, to0: T, to1: T): T {
	return ((value - from0) / (from1 - from0)) * (to1 - to0) + to0;
}