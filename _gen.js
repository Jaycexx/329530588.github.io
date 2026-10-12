const fs = require("fs");
const s = fs.readFileSync("tool/assets/index-FYdVXlLD.js", "utf8");
const keys = [
  "对对方的",
  "亲密骰子",
  "连锁：",
  "赌注 ",
  "回声：",
  "双方同时",
  "姿势：",
  "先和对方互换",
  "function Y0(",
  "function _s(",
  "D.text})",
];
for (const k of keys) {
  const i = s.indexOf(k);
  console.log("\n##", k, i);
  if (i >= 0) console.log(s.slice(i, i + 220));
}
const ed = s.indexOf("children:D.text");
console.log("\neditor", ed);
const head = s.slice(0, ed);
const re = /function [A-Za-z0-9_]+\(/g;
let last, m;
while ((m = re.exec(head))) last = m;
console.log("editor fn", last && last[0], last && last.index);
console.log(s.slice(last.index, last.index + 120));
