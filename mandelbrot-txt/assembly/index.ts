export declare function callback(x: i32, y: i32, value: i32): void;

const X1 = -2.1, X2 = 1.0;
const Y1 = -1.0, Y2 = 1.0;

export function mandelbrot(width: i32, height: i32, maxIterations: i32): void {

  maxIterations = max(10, maxIterations || 100);

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<f64>(<f64>px, 0.0, width, X1, X2);
      const y0 = scaleValue<f64>(<f64>py, 0.0, height, Y1, Y2);

      let x = 0.0;
      let y = 0.0;
      let iteration = 0;

      while (x * x + y * y <= 4 && iteration < maxIterations) {
        const temp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = temp;
        iteration++;
      }

      const v = scaleValue<i32>(iteration, 0, maxIterations, 0, 1);

      callback(px, py, v);
    }
  }
}

function scaleValue<T extends number>(value: T, from0: T, from1: T, to0: T, to1: T): T {
  return ((value - from0) / (from1 - from0)) * (to1 - to0) + to0;
}