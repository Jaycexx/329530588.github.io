const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
function around(n, extra = 200) {
  let i = 0, c = 0;
  while ((i = s.indexOf(n, i)) !== -1 && c < 3) {
    console.log("\n====", n, "@", i, "====");
    console.log(s.slice(i, i + extra));
    i += n.length;
    c++;
  }
}
around("function Dl(", 400);
around("function drawSmStageTask", 500);
around("function drawSingleBoardTask", 400);
around("children:i.task", 80);
// count chinese string literals
const re = /"([^"\\]*[\u4e00-\u9fff][^"\\]*)"/g;
const set = new Set();
let m;
while ((m = re.exec(s))) set.add(m[1]);
console.log("\nchinese strings", set.size);
const arr = [...set];
const lens = arr.map(x => x.length);
console.log("chars", lens.reduce((a,b)=>a+b,0), "avg", Math.round(lens.reduce((a,b)=>a+b,0)/arr.length), "max", Math.max(...lens));
fs.writeFileSync("_zh.json", JSON.stringify(arr));
