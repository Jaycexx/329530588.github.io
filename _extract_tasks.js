const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const re = /text:"((?:\\.|[^"\\])*)"/g;
const set = new Map();
let m;
while ((m = re.exec(s))) {
  const t = JSON.parse('"' + m[1] + '"');
  set.set(t, (set.get(t) || 0) + 1);
}
const texts = [...set.keys()];
console.log("unique", set.size);
console.log("total", [...set.values()].reduce((a, b) => a + b, 0));
const lens = texts.map((k) => k.length);
console.log(
  "avg",
  Math.round(lens.reduce((a, b) => a + b, 0) / lens.length),
  "max",
  Math.max(...lens),
  "chars",
  lens.reduce((a, b) => a + b, 0)
);
const names = [...s.matchAll(/name:"((?:\\.|[^"\\])*)"/g)].map((x) =>
  JSON.parse('"' + x[1] + '"')
);
console.log("names", names.length);
console.log(names.join("\n"));
fs.writeFileSync("_tasks.json", JSON.stringify(texts, null, 0));
console.log("wrote _tasks.json", texts.length);
