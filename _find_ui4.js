const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
function show(label, idx, before, after) {
  console.log("\n====", label, idx, "====");
  console.log(s.slice(idx - before, idx + after));
}
const i = s.indexOf("function T0(");
console.log("T0", i);
show("T0", i, 0, 2500);
