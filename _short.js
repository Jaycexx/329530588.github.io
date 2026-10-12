const tasks = JSON.parse(require("fs").readFileSync("_tasks.json", "utf8"));
const buckets = [4, 8, 12, 18, 30, 80];
let prev = 0;
for (const n of buckets) {
  const c = tasks.filter((t) => t.length > prev && t.length <= n).length;
  console.log(prev + 1 + "-" + n, c);
  prev = n;
}
console.log("short<=8:");
console.log(tasks.filter((t) => t.length <= 8).join("\n"));
