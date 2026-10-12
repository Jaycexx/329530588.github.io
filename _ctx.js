const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
function ctx(i, b, a) {
  console.log("\n========", i, "========");
  console.log(s.slice(i - b, i + a));
}
ctx(305700, 400, 200);
ctx(343700, 250, 120);
// find a stable insertion point near end of helpers, before function af or after e0/t0
const p = s.indexOf("function e0(");
console.log("\ne0", p);
console.log(s.slice(p, p + 280));
