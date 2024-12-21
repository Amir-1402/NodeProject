const fs = require("fs");
const path = require("path");
const dirpath = path.join(__dirname);

const output = path.join(dirpath, "out.txt");
fs.writeFileSync(output, ""); // Clear the output file

for (let i = 1; i <= 10; i++) {
  const joinfile = path.join(dirpath, `H${i}.txt`);
  if (fs.existsSync(joinfile)) {
    const textIN = fs.readFileSync(joinfile, "utf-8"); // Read file content
    const lines = textIN.split("\n"); // Split content into lines
    const newlines = lines.slice(0, i); // Get the first 'i' lines
    fs.appendFileSync(output, `\n ${newlines.join("\n")}`); // Append lines to output file
  }
}

console.log("The lines are completed");
