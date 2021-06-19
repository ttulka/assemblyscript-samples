export default class Canvas {

    readonly width: i32;
    readonly height: i32;

    constructor(width: i32, height: i32) {
        this.width = width;
        this.height = height;
    }

    drawImage(image: u8[], posX: i32, posY: i32, w: i32, h: i32): void {
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {

                const di = this.arrayIndex(x, y, w, h); // image data index
                
                if (image[di + 3] >= 100) { // draw only visible
                    
                    const ci = this.arrayIndex(x + posX, y + posY, this.width, this.height); // canvas index

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
                
                if (image[di + 3] >= 100) { // draw only visible
                    
                    const ci = this.arrayIndex(x, y, this.width, this.height); // canvas index

                    store<u8>(ci,     image[di]);
                    store<u8>(ci + 1, image[di + 1]);
                    store<u8>(ci + 2, image[di + 2]);
                    store<u8>(ci + 3, 255);
                }
            }
        }
    }

    private arrayIndex(x: i32, y: i32, w: i32, h: i32): i32 {
        // [0,0] is in the left bottom corner
        return (h - 1 - y) * w * 4 + x * 4;
    }
}