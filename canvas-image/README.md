# Canvas Images with AssemblyScript

This demo project show rendering images on a HTML canvas in multiple layers as parallax scrolling.

![Preview](parallax_preview.gif)

## Install 

```sh
npm install
```

### Compile to WebAssembly

```sh
npm run asbuild:optimized -- --memoryBase 40000
```

## Run
```sh
npx ws -p 1234
```

Open `http://127.0.0.1:1234` in a web browser.

## Play

- **RIGHT** go right
- **LEFT** go left

## Develop

### Convert images to AS byte arrays

```sh
node image2array.js assets/image.png > assembly/image.ts
```

## Copyright

Assets taken from https://kenney.nl/assets/pixel-platformer