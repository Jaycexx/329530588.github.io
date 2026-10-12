const fs = require("fs");
const lines = fs.readFileSync("tool/gap-runs.txt", "utf8").split(/\r?\n/).filter(Boolean);
const rows = lines.map((l) => {
  const [n, w] = l.split("\t");
  return { n: Number(n), w };
});
const multi = rows.filter((r) => r.w.length >= 2);
const single = rows.filter((r) => r.w.length === 1);
console.log("multi", multi.length, "single", single.length);
console.log("--- multi top ---");
console.log(multi.slice(0, 120).map((r) => r.n + "\t" + r.w).join("\n"));
console.log("--- singles ---");
console.log(single.slice(0, 150).map((r) => r.n + r.w).join(" "));
