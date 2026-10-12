const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
for (const name of ["function Y0(", "function _s(", "function T0(", "function nf("]) {
  const i = s.indexOf(name);
  console.log("\n====", name, i, "====");
  console.log(s.slice(i, i + 500));
}
