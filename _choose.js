const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const i = s.indexOf("chooseBoardTheme=");
console.log(s.slice(i, i + 500));
const j = s.indexOf("selectTheme:n=");
console.log("\n\n", s.slice(j, j + 400));
const k = s.indexOf("startGame:f=");
console.log("\n\nSTART", s.slice(k, k + 700));
