# Convert Image to Grayscale with WebAssembly

Demo project to show image transformation with WebAssembly written in AssemblyScript.

https://blog.ttulka.com/learning-webassembly-10-image-processing-in-assemblyscript

## Build
```sh
npm i
npm run asbuild:optimized -- --importMemory
```

## Run
```sh
npx ws -p 1234
```

Open `http://127.0.0.1:1234` in a web browser.

