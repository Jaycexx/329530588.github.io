const fs = require("fs");
const path = require("path");
const bundlePath = path.join("tool", "assets", "index-FYdVXlLD.js");
const src = fs.readFileSync(path.join("tool", "mquiz.js"), "utf8").trim();
if (!src.startsWith("/*MQ_START*/") || !src.endsWith("/*MQ_END*/")) {
  throw new Error("mquiz.js markers missing");
}
let s = fs.readFileSync(bundlePath, "utf8");

if (s.includes("/*MQ_START*/")) {
  s = s.replace(/\/\*MQ_START\*\/[\s\S]*?\/\*MQ_END\*\//, src);
  console.log("replaced existing MQuiz block");
} else {
  const anchor = "const wl=";
  const at = s.indexOf(anchor);
  if (at < 0) throw new Error("const wl= not found");
  s = s.slice(0, at) + src + s.slice(at);
  console.log("inserted MQuiz block");
}

function once(label, from, to) {
  const n = s.split(from).length - 1;
  if (n !== 1) throw new Error(label + " count " + n);
  s = s.replace(from, to);
  console.log("patched", label);
}

if (!s.includes('id:"mquiz"')) {
  once(
    "mode card",
    'icon:di}],P0=24;',
    'icon:di},{id:"mquiz",title:"M自测表",desc:"女M / 男M，逐项勾选",icon:mqIcon}],P0=24;'
  );
} else {
  console.log("mode card already present");
}

if (!s.includes('o!=="mquiz"')) {
  once(
    "hide theme picker",
    'const i=o!=="pose"&&o!=="board"&&o!=="boardSm",s=',
    'const i=o!=="pose"&&o!=="board"&&o!=="boardSm"&&o!=="mquiz",s='
  );
} else {
  console.log("theme picker guard already present");
}

if (!s.includes('o==="mquiz"?"女M、男M两张表')) {
  once(
    "subtitle",
    ':i?s:"选择游戏模式即可开始"',
    ':o==="mquiz"?"女M、男M两张表。点一个级别就记下，再点一次取消。结果只留在这台设备。":i?s:"选择游戏模式即可开始"'
  );
} else {
  console.log("subtitle already present");
}

if (!s.includes("a.jsx(MQuiz,{})")) {
  once(
    "mount",
    'i&&a.jsx("div",{className:"space-y-4",children:e.map((w,v)=>{const p=t.find',
    'o==="mquiz"&&a.jsx(MQuiz,{}),i&&a.jsx("div",{className:"space-y-4",children:e.map((w,v)=>{const p=t.find'
  );
} else {
  console.log("mount already present");
}

if (!s.includes('o!=="mquiz"&&a.jsx("div",{className:"relative z-20 shrink-0 pt-3 pb-1')) {
  once(
    "hide start",
    'a.jsx("div",{className:"relative z-20 shrink-0 pt-3 pb-1 bg-gradient-to-t from-black via-black/95 to-black/0",children:a.jsxs("button"',
    'o!=="mquiz"&&a.jsx("div",{className:"relative z-20 shrink-0 pt-3 pb-1 bg-gradient-to-t from-black via-black/95 to-black/0",children:a.jsxs("button"'
  );
} else {
  console.log("start button already hidden for mquiz");
}

const scrollOld = [
  'p==null||p.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})',
  'p==null||v.scrollTo({left:Math.max(0,p.offsetLeft-(v.clientWidth-p.clientWidth)/2),behavior:"smooth"})'
];
const scrollTo = 'p==null||v.scrollTo({left:Math.max(0,Math.min(v.scrollWidth-v.clientWidth,v.scrollLeft+p.getBoundingClientRect().left-v.getBoundingClientRect().left-(v.clientWidth-p.clientWidth)/2)),behavior:"smooth"})';
if (s.includes(scrollTo)) {
  console.log("mode scroller already patched");
} else {
  const from = scrollOld.find(item => s.includes(item));
  if (!from) throw new Error("mode scroller anchor missing");
  s = s.replace(from, scrollTo);
  console.log("patched mode scroller");
}

const block = s.slice(s.indexOf("/*MQ_START*/"), s.indexOf("/*MQ_END*/") + "/*MQ_END*/".length);
new Function("$", "e0", "t0", "N", "a", block);
console.log("syntax ok", block.length);

fs.writeFileSync(bundlePath, s);
console.log("wrote", bundlePath, s.length);
