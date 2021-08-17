const image2x1: StaticArray<u8> = Inliner.inlineImageAsRgbaStaticArray("../assets/img2x1.png");
const image3x2: StaticArray<u8> = Inliner.inlineImageAsRgbaStaticArray("../assets/img3x2.png");

export function length2x1(): i32 {
    return image2x1.length;
}

export function length3x2(): i32 {
    return image3x2.length;
}

export function valueAt2x1(index: i32): i32 {
    return image2x1[index];
}

export function valueAt3x2(index: i32): i32 {
    return image3x2[index];
}
