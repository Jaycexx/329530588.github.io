const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
function fnBefore(idx) {
  const head = s.slice(0, idx);
  const re = /function [A-Za-z0-9_]+\(/g;
  let last = null, m;
  while ((m = re.exec(head))) last = m;
  console.log("nearest fn before", idx, last && last[0], last && last.index);
  console.log(s.slice(last.index, last.index + 180));
}
fnBefore(343920);
fnBefore(305927);
// theme editor task rows
const k = s.indexOf("tasks.map");
console.log("\nmap sites");
let i = 0, c = 0;
while ((i = s.indexOf(".tasks.map", i)) !== -1 && c < 5) {
  console.log("\n@", i);
  console.log(s.slice(i, i + 350));
  i += 10; c++;
}
