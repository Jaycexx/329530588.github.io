const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const re = /children:[a-zA-Z0-9_.?]{0,12}task/g;
let m, c = 0;
while ((m = re.exec(s))) {
  c++;
  console.log("\n@", m.index, m[0]);
  console.log(s.slice(m.index - 100, m.index + 80));
}
console.log("total", c);

// dice face labels rendered?
const i = s.indexOf("diceActions");
console.log("\n\ndiceActions", i);
if (i > 0) console.log(s.slice(i, i + 400));
