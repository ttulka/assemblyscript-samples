# Canvas Images with AssemblyScript

A small pixel art game powered by WebAssembly.

## Build

## Install 

```sh
npm install
```

### Convert images to AS byte arrays

```sh
node image2array.js assets/image.png > assembly/image.ts
```

### Compile to WebAssembly

```sh
npm run asbuild:optimized -- --importMemory
```

## Run
```sh
npx ws -p 1234
```

Open `http://127.0.0.1:1234` in a web browser.
