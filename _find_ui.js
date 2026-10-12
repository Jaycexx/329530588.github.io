const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const needles = [
  "children:i.task",
  "选择主题",
  "开始游戏",
  "自定义",
  "任务包",
  "词条",
  "function zt(",
  "drawSingleBoardTask",
  "i.task.text",
  ".task}",
  "task:",
];
for (const n of ["children:i.task", "词条", "开始", "语言"]) {
  let i = 0, c = 0;
  while ((i = s.indexOf(n, i)) !== -1 && c < 8) {
    console.log("\n---", n, i, "---");
    console.log(s.slice(Math.max(0, i - 120), i + 180));
    i += n.length;
    c++;
  }
}
console.log("\nlen", s.length);
