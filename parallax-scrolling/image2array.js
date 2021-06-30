const image = require("get-image-data");

const filename = process.argv[2] || "./image.png";

const out = process.stdout;
 
image(filename, function (err, {data}) {
  
  out.write("const image: u8[] = [");
 
  for (var i = 0, l = data.length; i < l; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
   
    out.write(`${r}, ${g}, ${b}, ${a}, `);
  }

  out.write("];\n");
  out.write("export default image;\n");
})