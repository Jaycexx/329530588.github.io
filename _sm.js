const fs = require("fs");
const tasks = JSON.parse(fs.readFileSync("_tasks.json", "utf8"));
const sm = tasks.filter((t) => t.startsWith("【"));
const rest = tasks.filter((t) => !t.startsWith("【"));
fs.writeFileSync("_sm.txt", sm.join("\n"));
fs.writeFileSync("_rest.txt", rest.join("\n"));
console.log("sm", sm.length, "rest", rest.length);
