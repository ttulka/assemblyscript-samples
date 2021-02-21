export function mandelbrot(width: i32, height: i32, maxIterations: i32): void {
  const MAX_ITERATIONS = maxIterations || 255;
  const COLORS = new Array<i32>()

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<f32>(<f32>px, 0.0, <f32>width, -2.5, 1.0);
      const y0 = scaleValue<f32>(<f32>py, 0.0, <f32>height, -1.0, 1.0);

      let x = 0.0;
      let y = 0.0;
      let iteration = 0;

      while (x*x + y*y <= 4 && iteration < MAX_ITERATIONS) {
        const temp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = temp;
        iteration++;
      }

      const color = scaleValue<i32>(iteration, 0, MAX_ITERATIONS, 0, 255);
      const b = color % 256;
      const g = ((color - b) / 256) % 256;
      const r = ((color -  b) / 256**2) - g / 256;

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