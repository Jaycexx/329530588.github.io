const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const i = s.indexOf("poseRiders");
console.log(s.slice(i, i + 800));
const j = s.indexOf("回声：把上一张");
console.log("\n---echo2", j);
console.log(s.slice(j, j + 400));
