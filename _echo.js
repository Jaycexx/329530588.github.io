const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const i = s.indexOf("function diceLine");
console.log(s.slice(i, i + 3500));
