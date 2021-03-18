# Plotting Mandelbrot Set into PNG in WebAssembly

Theoretically unlimited zooming into the Mandelbrot Set.

Using [as-big](https://github.com/ttulka/as-big) for arbitrary-precision decimal arithmetic.

> :warning: Compute-intensive!

## Build

```sh
npm i
npm run asbuild:optimized
```

## Usage

```sh
node index.js [image-width] [zoom] [x-offset] [y-offset] [max-iterations]
```

- `image-width`: with of the resulting image in pixels (default: `100`)
- `zoom`: zoom value (default: `1`)
- `x-offset`: offset of the X axis (default: `-2.15`)
- `y-offset`: offset of the Y axis (default: `-1.25`)
- `max-iterations`: Maximal iterations (default: `1000`)

Example:

```sh
node index.js 100 333 -0.665 -0.455 1000
node index.js 100 10000000000000000000000 -0.65708809159912072260101 -0.45040104259032688650481 5000
```
