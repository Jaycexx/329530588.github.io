const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const i = s.indexOf("配置游戏角色");
console.log(s.slice(i, i + 500));
console.log("\n---helpers already?", s.includes("function LangPick"));
