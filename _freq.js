const fs = require("fs");
const tasks = JSON.parse(fs.readFileSync("_tasks.json", "utf8"));
const freq = new Map();
for (const t of tasks) {
  const s = t.replace(/【[^】]+】/g, "");
  for (let n = 2; n <= 8; n++) {
    const seen = new Set();
    for (let i = 0; i + n <= s.length; i++) {
      const g = s.slice(i, i + n);
      if (!/^[\u4e00-\u9fff]+$/.test(g)) continue;
      if (seen.has(g)) continue;
      seen.add(g);
      freq.set(g, (freq.get(g) || 0) + 1);
    }
  }
}
const rows = [...freq.entries()].filter(([, c]) => c >= 8).sort((a, b) => b[1] * b[0].length - a[1] * a[0].length);
// prefer longer phrases: drop a phrase if a longer one containing it has similar count
const kept = [];
for (const [g, c] of rows) {
  if (kept.some(([k, kc]) => k.includes(g) && kc >= c * 0.8)) continue;
  kept.push([g, c]);
}
console.log(kept.slice(0, 250).map(([g, c]) => c + "\t" + g).join("\n"));
console.log("---kept", kept.length);
