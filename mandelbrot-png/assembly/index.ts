import Big from 'as-big/Big';

export declare function callback(x: i32, y: i32, r: i32, g: i32, b: i32): void;

const X1 = -2.15, X2 = 1.15;
const Y1 = -1.25, Y2 = 1.25;

const FOUR = Big.of(4);

export function mandelbrot(
    width: i32, height: i32, zoomTimes: string, offsetX: string, offsetY: string, maxIterations: i32,
    rMagnitude: u32, gMagnitude: u32, bMagnitude: u32,
    presicison: u32 = 20): void {

  maxIterations = max(10, maxIterations || 100);

  rMagnitude = max(1, rMagnitude || 7);
  gMagnitude = max(1, gMagnitude || 2);
  bMagnitude = max(1, bMagnitude || 4);

  const maxMagnitude = Math.log(maxIterations) * Math.PI;

  const maxPrecision = presicison;
  const defaultPrecision = Big.DP;
  Big.DP = maxPrecision;  

  const offX = Big.of(offsetX);
  const offY = Big.of(offsetY);
  const zoom = Big.of(zoomTimes);

  const w = Big.of(width);
  const h = Big.of(height);

  const ratioX = Big.of(-X1 + X2) / w;
  const ratioY = Big.of(-Y1 + Y2) / h;

  const x1 = offX, x2 = x1 + w * ratioX / zoom;
  const y1 = offY, y2 = y1 + h * ratioY / zoom;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<Big>(Big.of(px), Big.ZERO, w, x1, x2);
      const y0 = scaleValue<Big>(Big.of(py), Big.ZERO, h, y1, y2);

      let x = Big.ZERO;
      let y = Big.ZERO;
      let iteration = 0;

      // // original naive algorithm:
      // while (x * x + y * y <= FOUR && iteration < maxIterations) {
      //   const temp = x * x - y * y + x0;
      //   y = (Big.TWO * x * y + y0).round(maxPrecision);
      //   x = temp.round(maxPrecision);
      //   iteration++;
      // }

      let _x = Big.ZERO;
      let _y = Big.ZERO;

      while (_x + _y <= FOUR && iteration < maxIterations) {
        y = (Big.TWO * x * y + y0).round(maxPrecision);
        x = (_x - _y + x0).round(maxPrecision);
        _x = x * x;
        _y = y * y;
        iteration++;
      }

      const r = scaleValue<f64>(Math.log(iteration) * rMagnitude, 0, maxMagnitude, 0, 255);
      const g = scaleValue<f64>(Math.log(iteration) * gMagnitude, 0, maxMagnitude, 0, 255);
      const b = scaleValue<f64>(Math.log(iteration) * bMagnitude, 0, maxMagnitude, 0, 255);

      callback(px, py, r as u8, g as u8, b as u8);
    }
  }

  Big.DP = defaultPrecision; 
}

export function mandelbrot_native(
    width: i32, height: i32, zoomTimes: i32, offsetX: f64, offsetY: f64, maxIterations: i32,
    rMagnitude: u32, gMagnitude: u32, bMagnitude: u32): void {

  maxIterations = max(10, maxIterations || 100);

  rMagnitude = max(1, rMagnitude || 7);
  gMagnitude = max(1, gMagnitude || 2);
  bMagnitude = max(1, bMagnitude || 4);

  const maxMagnitude = Math.log(maxIterations) * Math.PI;

  const offX = offsetX || X1;
  const offY = offsetY || Y1;
  const zoom = zoomTimes || 1;

  const w = <f64>width;
  const h = <f64>height;

  const ratioX = (-X1 + X2) / w;
  const ratioY = (-Y1 + Y2) / h;

  const x1 = offX, x2 = x1 + w * ratioX / zoom;
  const y1 = offY, y2 = y1 + h * ratioY / zoom;

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {

      const x0 = scaleValue<f64>(<f64>px, 0.0, w, x1, x2);
      const y0 = scaleValue<f64>(<f64>py, 0.0, h, y1, y2);

      let x = 0.0;
      let y = 0.0;
      let iteration = 0;

      // // original naive algorithm:
      // while (x * x + y * y <= 4 && iteration < maxIterations) {
      //   const temp = x * x - y * y + x0;
      //   y = 2 * x * y + y0;
      //   x = temp;
      //   iteration++;
      // }

      let _x = 0.0;
      let _y = 0.0;

      while (_x + _y <= 4 && iteration < maxIterations) {
        y = 2 * x * y + y0;
        x = _x - _y + x0;
        _x = x * x;
        _y = y * y;
        iteration++;
      }

      const r = scaleValue<f64>(Math.log(iteration) * rMagnitude, 0, maxMagnitude, 0, 255);
      const g = scaleValue<f64>(Math.log(iteration) * gMagnitude, 0, maxMagnitude, 0, 255);
      const b = scaleValue<f64>(Math.log(iteration) * bMagnitude, 0, maxMagnitude, 0, 255);

      callback(px, py, r as u8, g as u8, b as u8);
    }
  }
}

function scaleValue<T extends number>(value: T, from0: T, from1: T, to0: T, to1: T): T {
  return ((value - from0) / (from1 - from0)) * (to1 - to0) + to0;
}