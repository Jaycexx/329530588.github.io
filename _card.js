const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const i = s.indexOf("children:i.task");
console.log(s.slice(i - 500, i + 80));
console.log("\n\nCOUNT 主题名称", s.split('children:"主题名称"').length - 1);
console.log("COUNT D.text", s.split("children:D.text").length - 1);
console.log("COUNT item.task", s.split("children:item.task").length - 1);
