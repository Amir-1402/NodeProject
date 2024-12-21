// Amir Fahmawi && Mohammad Zaaroura 49 /3

const fs = require("fs");
const path = require("path");
const dirpath = path.join(__dirname);

const output = path.join(dirpath, "out.txt");
fs.writeFileSync(output, "");

for (let i = 1; i <= 10; i++) {
  const joinfile = path.join(dirpath, `H${i}.txt`);
  if (fs.existsSync(joinfile)) {
    const textIN = fs.readFileSync(joinfile, "utf-8");
    const lines = textIN.split("\n");
    const newlines = lines.slice(0, i);
    fs.appendFileSync(output, `\n ${newlines.join("\n")}`);
  }
}

console.log("The lines are completed");
