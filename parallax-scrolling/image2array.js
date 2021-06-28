const image = require("get-image-data");

const filename = process.argv[2] || "./image.png";
 
image(filename, function (err, info) {
  const data = info.data;
  // const width = info.width;
  // const height = info.height;

  process.stdout.write("const image: u8[] = [");
 
  for (var i = 0, l = data.length; i < l; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
   
    process.stdout.write(`${r}, ${g}, ${b}, ${a}, `);
  }

  process.stdout.write("];\n");
  process.stdout.write("export default image;\n");
})