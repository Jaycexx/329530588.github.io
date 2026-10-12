const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");

const tasks = new Set();
const reText = /\{text:"((?:\\.|[^"\\])*)"/g;
let m;
while ((m = reText.exec(s))) tasks.add(JSON.parse('"' + m[1] + '"'));

// Dl(["...","..."]) blocks
const reDl = /Dl\(\[([\s\S]*?)\]\)/g;
let d;
while ((d = reDl.exec(s))) {
  const reStr = /"((?:\\.|[^"\\])*)"/g;
  let x;
  while ((x = reStr.exec(d[1]))) tasks.add(JSON.parse('"' + x[1] + '"'));
}

const arr = [...tasks];
console.log("tasks", arr.length, "chars", arr.reduce((a, b) => a + b.length, 0));
fs.writeFileSync("_tasks.json", JSON.stringify(arr, null, 0));

// sample longest
arr.sort((a, b) => b.length - a.length);
console.log("longest:\n" + arr.slice(0, 8).join("\n---\n"));
