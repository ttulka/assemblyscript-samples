const image: u8[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 76, 37, 2, 48, 76, 37, 2, 46, 79, 56, 2, 48, 76, 37, 2, 48, 76, 37, 2, 47, 78, 48, 2, 47, 78, 48, 2, 48, 76, 37, 2, 48, 76, 37, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 76, 37, 4, 48, 76, 39, 251, 47, 78, 49, 253, 47, 77, 44, 253, 48, 76, 37, 253, 48, 76, 39, 253, 48, 76, 39, 253, 47, 77, 43, 253, 48, 76, 37, 253, 48, 77, 41, 251, 47, 78, 48, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 77, 43, 4, 48, 76, 39, 251, 48, 76, 37, 255, 51, 77, 39, 255, 50, 79, 48, 255, 51, 78, 41, 255, 51, 77, 39, 255, 51, 77, 37, 255, 51, 78, 44, 255, 51, 78, 43, 255, 47, 77, 44, 255, 48, 77, 41, 251, 48, 76, 37, 4, 0, 0, 0, 0, 0, 0, 0, 0, 48, 76, 37, 2, 48, 76, 39, 251, 47, 77, 43, 255, 54, 79, 46, 255, 192, 148, 63, 255, 192, 149, 63, 255, 192, 149, 63, 255, 192, 149, 63, 255, 192, 149, 63, 255, 192, 149, 63, 255, 192, 148, 63, 255, 54, 79, 42, 255, 48, 76, 39, 255, 47, 77, 43, 251, 47, 77, 43, 4, 0, 0, 0, 0, 47, 78, 47, 4, 48, 77, 41, 253, 51, 77, 39, 255, 188, 144, 64, 255, 192, 145, 58, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 195, 151, 64, 255, 53, 78, 43, 255, 48, 76, 39, 255, 47, 77, 43, 251, 48, 76, 37, 4, 48, 77, 41, 253, 47, 77, 43, 255, 54, 80, 48, 255, 186, 150, 66, 255, 206, 167, 87, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 196, 152, 64, 255, 168, 131, 63, 255, 53, 77, 38, 255, 48, 77, 41, 255, 47, 77, 43, 253, 48, 76, 39, 255, 51, 78, 41, 255, 195, 155, 66, 255, 188, 139, 60, 255, 203, 164, 85, 255, 208, 169, 89, 255, 207, 169, 89, 255, 208, 169, 89, 255, 208, 169, 89, 255, 207, 169, 89, 255, 208, 169, 89, 255, 196, 152, 65, 255, 196, 169, 119, 255, 163, 128, 61, 255, 50, 77, 39, 255, 48, 76, 39, 255, 48, 77, 41, 255, 51, 77, 41, 255, 178, 134, 56, 255, 195, 149, 67, 255, 186, 141, 62, 255, 207, 168, 88, 255, 89, 81, 40, 255, 207, 168, 89, 255, 207, 168, 89, 255, 89, 81, 41, 255, 207, 168, 88, 255, 169, 130, 54, 255, 195, 153, 72, 255, 180, 135, 53, 255, 51, 77, 39, 255, 47, 77, 43, 255, 48, 77, 41, 255, 51, 78, 41, 255, 192, 149, 71, 255, 186, 140, 58, 255, 194, 150, 64, 255, 183, 138, 59, 255, 182, 138, 63, 255, 193, 150, 64, 255, 187, 142, 63, 255, 188, 144, 74, 255, 181, 139, 62, 255, 202, 167, 98, 255, 171, 129, 46, 255, 193, 147, 66, 255, 51, 77, 39, 255, 47, 77, 43, 255, 47, 77, 43, 255, 50, 77, 43, 255, 166, 126, 53, 255, 192, 147, 64, 255, 185, 139, 58, 255, 195, 150, 72, 255, 164, 126, 60, 255, 86, 78, 39, 255, 86, 78, 39, 255, 164, 126, 60, 255, 195, 148, 69, 255, 186, 139, 54, 255, 191, 147, 66, 255, 167, 126, 58, 255, 50, 77, 39, 255, 47, 77, 46, 255, 48, 76, 39, 253, 48, 77, 41, 255, 52, 78, 43, 255, 163, 126, 60, 255, 194, 146, 64, 255, 183, 137, 54, 255, 195, 149, 67, 255, 191, 147, 58, 255, 188, 143, 62, 255, 193, 145, 67, 255, 186, 140, 58, 255, 195, 150, 75, 255, 169, 128, 50, 255, 176, 131, 62, 255, 50, 77, 41, 255, 48, 77, 41, 255, 48, 76, 37, 4, 48, 77, 41, 251, 47, 77, 44, 255, 52, 78, 41, 255, 164, 121, 50, 255, 171, 128, 57, 255, 176, 129, 53, 255, 176, 129, 53, 255, 176, 127, 55, 255, 176, 125, 54, 255, 176, 125, 54, 255, 178, 128, 53, 255, 163, 121, 43, 255, 53, 78, 41, 255, 48, 76, 39, 255, 48, 77, 41, 253, 0, 0, 0, 0, 48, 76, 37, 4, 48, 77, 41, 251, 47, 77, 43, 255, 50, 78, 44, 255, 50, 77, 41, 255, 50, 77, 43, 255, 50, 77, 41, 255, 51, 77, 39, 255, 50, 77, 43, 255, 50, 77, 43, 255, 50, 78, 46, 255, 50, 77, 41, 255, 48, 77, 41, 255, 48, 77, 41, 251, 47, 78, 48, 4, 0, 0, 0, 0, 0, 0, 0, 0, 47, 77, 43, 4, 48, 76, 39, 251, 47, 77, 43, 253, 47, 77, 44, 253, 47, 77, 43, 253, 48, 76, 37, 253, 47, 77, 43, 253, 48, 76, 39, 253, 48, 77, 41, 253, 48, 77, 41, 253, 48, 76, 39, 253, 48, 76, 39, 251, 47, 77, 43, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 76, 37, 2, 48, 76, 37, 2, 48, 76, 37, 2, 46, 79, 56, 2, 48, 76, 38, 2, 48, 76, 37, 2, 47, 78, 48, 2, 48, 76, 37, 2, 48, 76, 37, 2, 48, 76, 37, 2, 48, 76, 37, 2, 0, 0, 0, 0, 0, 0, 0, 0, ];
export default image;
