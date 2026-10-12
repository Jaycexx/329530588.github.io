const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const n = "children:i.task";
console.log("count children:i.task", s.split(n).length - 1);
const needles = ["updateThemeTask", "task.text", "添加任务", "词条管理", "tasks.map"];
for (const n of needles) {
  let i = 0, c = 0;
  console.log("\n##", n, "count", s.split(n).length - 1);
  while ((i = s.indexOf(n, i)) !== -1 && c < 2) {
    console.log("---", i);
    console.log(s.slice(Math.max(0, i - 60), i + 200).replace(/\n/g, " "));
    i += n.length;
    c++;
  }
}
