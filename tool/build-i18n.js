const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "assets/index-FYdVXlLD.js");
const glossaryPath = path.join(__dirname, "task-glossary.tsv");
const glossaryMore = path.join(__dirname, "task-glossary-2.tsv");
const glossaryRest = path.join(__dirname, "task-glossary-3.tsv");
const glossaryLast = path.join(__dirname, "task-glossary-4.tsv");
const outPath = path.join(__dirname, "assets/task-i18n.json");
const langs = ["en", "vi", "th", "id", "ja"];

function extractTasks(source) {
  const tasks = new Set();
  const reText = /\{text:"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = reText.exec(source))) tasks.add(JSON.parse('"' + m[1] + '"'));
  const reDl = /Dl\(\[([\s\S]*?)\]\)/g;
  let d;
  while ((d = reDl.exec(source))) {
    const reStr = /"((?:\\.|[^"\\])*)"/g;
    let x;
    while ((x = reStr.exec(d[1]))) tasks.add(JSON.parse('"' + x[1] + '"'));
  }
  const reQ = /"((?:\\.|[^"\\])*)"/g;
  let q;
  while ((q = reQ.exec(source))) {
    let text;
    try { text = JSON.parse('"' + q[1] + '"'); } catch { continue; }
    text = text.trim();
    if (text.length >= 2 && text.length <= 400 && /[\u4e00-\u9fff]/.test(text)) tasks.add(text);
  }
  return [...tasks];
}

function loadGlossary(file, minLen) {
  const dict = new Map();
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim() || line.startsWith("#")) continue;
    const cols = line.split("\t");
    while (cols.length < 6) cols.push("");
    if (!cols[0] || cols[0].length < minLen || dict.has(cols[0])) continue;
    dict.set(cols[0], cols.slice(1, 6));
  }
  return dict;
}

function norm(s) {
  return s
    .replace(/nai头/g, "乳头")
    .replace(/nai交/g, "乳交")
    .replace(/nai/g, "奶")
    .replace(/xiong/gi, "胸")
    .replace(/kou交/g, "口交")
    .replace(/KJ/g, "口交")
    .replace(/CAO/g, "操")
    .replace(/cao/g, "操")
    .replace(/cha入/g, "插入")
    .replace(/颜she/g, "颜射")
    .replace(/she在/g, "射在")
    .replace(/jing液/g, "精液")
    .replace(/gui头/g, "龟头")
    .replace(/规头/g, "龟头")
    .replace(/路罐/g, "撸管")
    .replace(/lu管/g, "撸管")
    .replace(/银地/g, "阴蒂")
    .replace(/柰子/g, "奶子")
    .replace(/奈子/g, "奶子")
    .replace(/后ru/g, "后入")
    .replace(/PP/g, "屁股")
    .replace(/JJ/g, "阴茎")
    .replace(/紫薇/g, "自慰")
    .replace(/(^|[^A-Za-z])B(?=[^A-Za-z]|$)/g, "$1私处");
}

const units = {
  秒钟: ["seconds", "giây", "วินาที", "detik", "秒"],
  秒: ["seconds", "giây", "วินาที", "detik", "秒"],
  分钟: ["minutes", "phút", "นาที", "menit", "分"],
  分: ["minutes", "phút", "นาที", "menit", "分"],
  下: ["strokes", "cái", "ครั้ง", "kali", "回"],
  次: ["times", "lần", "ครั้ง", "kali", "回"],
  圈: ["circles", "vòng", "รอบ", "putaran", "周"],
  口: ["sips", "ngụm", "อึก", "teguk", "口"],
  张: ["photos", "tấm", "ใบ", "lembar", "枚"],
  杯: ["glasses", "ly", "แก้ว", "gelas", "杯"],
  遍: ["times", "lần", "รอบ", "kali", "回"],
  轮: ["rounds", "vòng", "รอบ", "ronde", "ラウンド"],
  步: ["steps", "bước", "ก้าว", "langkah", "歩"],
};

const punct = {
  "，": ",",
  "。": ".",
  "！": "!",
  "？": "?",
  "、": ",",
  "：": ":",
  "；": ";",
  "「": '"',
  "」": '"',
  "“": '"',
  "”": '"',
  "‘": "'",
  "’": "'",
  "（": "(",
  "）": ")",
  "【": "[",
  "】": "]",
  "《": '"',
  "》": '"',
  "…": "...",
  "—": "-",
  "～": "~",
  "·": "·",
};

function compile(dict) {
  let maxLen = 1;
  for (const key of dict.keys()) maxLen = Math.max(maxLen, key.length);
  return { dict, maxLen };
}

function translate(raw, langIndex, compiled) {
  const s = norm(raw);
  const { dict, maxLen } = compiled;
  const parts = [];
  const gaps = [];
  let gapRun = "";
  const flushGap = () => {
    if (!gapRun) return;
    gaps.push("|" + gapRun);
    gapRun = "";
  };
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === "\n") {
      flushGap();
      parts.push("\n");
      i++;
      continue;
    }
    if (/\s/.test(ch)) {
      flushGap();
      i++;
      continue;
    }
    const num = /^(\d+)\s*(秒钟|秒|分钟|分|下|次|圈|口|张|杯|遍|轮|步)/.exec(s.slice(i));
    if (num) {
      flushGap();
      parts.push(num[1] + " " + units[num[2]][langIndex]);
      i += num[0].length;
      continue;
    }
    if (/[A-Za-z0-9]/.test(ch)) {
      flushGap();
      const m = /^[A-Za-z0-9]+(?:[ '+][A-Za-z0-9]+)*/.exec(s.slice(i));
      parts.push(m[0]);
      i += m[0].length;
      continue;
    }
    let matched = false;
    const upper = Math.min(maxLen, s.length - i);
    for (let len = upper; len >= 1; len--) {
      const slice = s.slice(i, i + len);
      if (dict.has(slice)) {
        flushGap();
        const word = dict.get(slice)[langIndex];
        if (word) parts.push(word);
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;
    if (punct[ch]) {
      flushGap();
      parts.push(punct[ch]);
      i++;
      continue;
    }
    gapRun += ch;
    parts.push(ch);
    i++;
  }
  flushGap();
  let out = "";
  for (const part of parts) {
    if (part === "\n") {
      out += "\n";
      continue;
    }
    if (!out || out.endsWith("\n")) out += part;
    else if (/^[,.!?:;)\]]/.test(part)) out += part;
    else out += " " + part;
  }
  out = out.replace(/\[\s+/g, "[").replace(/\s+\]/g, "]");
  out = out.replace(/\(\s+/g, "(").replace(/\s+\)/g, ")");
  out = out.replace(/"\s+/g, '"').replace(/\s+"/g, '"');
  out = out.replace(/[ \t]{2,}/g, " ");
  out = out.replace(/\s+\n/g, "\n").replace(/\n\s+/g, "\n").trim();
  if (langIndex === 0 && out) out = out.charAt(0).toUpperCase() + out.slice(1);
  return { text: out, gaps };
}

function main() {
  const source = fs.readFileSync(bundlePath, "utf8");
  const tasks = extractTasks(source);
  const dict = loadGlossary(glossaryPath, 2);
  if (fs.existsSync(glossaryMore)) {
    for (const [k, v] of loadGlossary(glossaryMore, 1)) dict.set(k, v);
  }
  if (fs.existsSync(glossaryRest)) {
    for (const [k, v] of loadGlossary(glossaryRest, 1)) if (!dict.has(k)) dict.set(k, v);
  }
  if (fs.existsSync(glossaryLast)) {
    for (const [k, v] of loadGlossary(glossaryLast, 1)) if (!dict.has(k)) dict.set(k, v);
  }
  const compiled = compile(dict);
  const out = {};
  const gapCount = new Map();
  let dirty = 0;
  const extras = ["保持这个姿势 30 秒，中途不许笑场。","用这个姿势慢慢动 15 下。","换成这个姿势，让对方掌控节奏 30 秒。","用这个姿势贴着亲吻并磨蹭 20 秒。","轻档：选择脱掉一件衣服，可重复触发，直到全裸。","重档：露出性器官进行游戏。","先和对方互换现在的格子，再完成：","亲对方 20 秒。","亲一下对方","按图做。","没指定姿势，随机：","这段的收束，两个人一起：","两个人一起完成："];
  for (const extra of extras) if (!tasks.includes(extra)) tasks.push(extra);
  for (const task of tasks) {
    const row = {};
    langs.forEach((lang, index) => {
      const result = translate(task, index, compiled);
      row[lang] = result.text;
      if (index === 0) {
        for (const g of result.gaps) gapCount.set(g, (gapCount.get(g) || 0) + 1);
        if (/[\u4e00-\u9fff]/.test(result.text)) dirty++;
      }
    });
    if (/[\u4e00-\u9fff]/.test(row.en)) continue;
    out[task] = row;
  }
  fs.writeFileSync(outPath, JSON.stringify(out));
  const gaps = [...gapCount.entries()].filter(([c]) => c.startsWith("|")).sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  console.log("tasks", tasks.length, "keys", Object.keys(out).length, "dirty-en", dirty, "bytes", fs.statSync(outPath).size);
  fs.writeFileSync(path.join(__dirname, "gap-runs.txt"), gaps.map(([c, n]) => n + "\t" + c.slice(1)).join("\n"));
  console.log("gap-runs", gaps.length);
  console.log(gaps.slice(0, 40).map(([c, n]) => n + ":" + c.slice(1)).join("\n"));
  const samples = tasks.filter((t) => t.length > 18).slice(0, 8);
  for (const sample of samples) {
    console.log("\nZH", sample);
    console.log("EN", out[sample].en);
    console.log("VI", out[sample].vi);
    console.log("JA", out[sample].ja);
  }
}

main();
