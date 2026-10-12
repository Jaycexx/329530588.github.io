const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const i = s.indexOf("function nf(");
console.log(s.slice(i, i + 2200));
