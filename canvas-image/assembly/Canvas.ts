export default class Canvas {

    readonly width: i32;
    readonly height: i32;

    constructor(width: i32, height: i32) {
        this.width = width;
        this.height = height;
    }

    drawImage(image: u8[], posX: i32, posY: i32, width: i32, height: i32, red: boolean = false): void {
        if (posX + width < 0 || posX > this.width) {
            return; // not visible
        }
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                if (x + posX < 0 || x + posX >= this.width) continue;

                const di = this.arrayIndex(x, y, width, height); // image data index

                if (image[di + 3] < 100) continue;
                
                const ci = this.arrayIndex(x + posX, y + posY, this.width, this.height); // canvas index

                if (red) {
                    store<u8>(ci,     image[di]);
                    store<u8>(ci + 1, 0);
                    store<u8>(ci + 2, 0);
                    store<u8>(ci + 3, 255);
                } else {
                    store<u8>(ci,     image[di]);
                    store<u8>(ci + 1, image[di + 1]);
                    store<u8>(ci + 2, image[di + 2]);
                    store<u8>(ci + 3, 255);
                }
            }
        }
    }

    drawBackground(image: u8[], imageOffsetX: i32 = 0): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {

                const di = this.arrayIndex((x + imageOffsetX) % this.width, y, this.width, this.height); // image data index

                if (image[di + 3] < 100) continue;
                
                const ci = this.arrayIndex(x, y, this.width, this.height); // canvas index

                store<u8>(ci,     image[di]);
                store<u8>(ci + 1, image[di + 1]);
                store<u8>(ci + 2, image[di + 2]);
                store<u8>(ci + 3, 255);
            }
        }
    }

    turnToGray(): void {
        for (let i = 0; i < this.width * this.height * 4; i += 4 /*rgba*/) {
            const r = load<u8>(i);
            const g = load<u8>(i + 1);
            const b = load<u8>(i + 2);
            
            const gray = u8(r * 0.2126 + g * 0.7152 + b * 0.0722);
        
            store<u8>(i,     gray);
            store<u8>(i + 1, gray);
            store<u8>(i + 2, gray);
          }
    }

    private arrayIndex(x: i32, y: i32, w: i32, h: i32): i32 {
        // [0,0] is in the left bottom corner
        return (h - 1 - y) * w * 4 + x * 4;
    }
}