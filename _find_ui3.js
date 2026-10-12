const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const keys = ["选择玩法", "飞行棋", "开始", "view===", "e.view", "setup", "情侣"];
for (const n of ["e.view===", 'view==="', "switchView", "首页"]) {
  let i = 0, c = 0;
  while ((i = s.indexOf(n, i)) !== -1 && c < 6) {
    console.log("\n---", JSON.stringify(n), i, "---");
    console.log(s.slice(Math.max(0, i - 80), i + 220).replace(/\n/g, " "));
    i += n.length;
    c++;
  }
}
