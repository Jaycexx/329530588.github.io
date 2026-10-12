const fs = require("fs");
const tasks = JSON.parse(fs.readFileSync("_tasks.json", "utf8"));
const tags = new Map();
for (const t of tasks) {
  for (const m of t.matchAll(/【[^】]{1,12}】/g)) tags.set(m[0], (tags.get(m[0]) || 0) + 1);
}
console.log("tags", [...tags.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => v + " " + k).join("\n"));
console.log("tasks", tasks.length);
