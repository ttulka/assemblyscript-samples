# Canvas Images with AssemblyScript

A small 2D game powered by WebAssembly.

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
npm run asbuild:optimized -- --memoryBase 40000
```

## Run
```sh
npx ws -p 1234
```

Open `http://127.0.0.1:1234` in a web browser.

## Play

### Breadcrumb Lost

It is easy for children to follow breadcrumbs to get back home. But what about the poor breadcrumbs?!

Help a lost breadcrumb to find its way home without getting wet or eaten.

#### Controls

- **UP** jump
- **RIGHT** go right
- **LEFT** go left

## Copyright

Assets taken from https://kenney.nl/assets/pixel-platformer