const fs = require("fs");
const path = require("path");
const file = path.join("tool", "assets", "index-FYdVXlLD.js");
let s = fs.readFileSync(file, "utf8");

function once(oldStr, newStr, label) {
  const n = s.split(oldStr).length - 1;
  if (n !== 1) throw new Error(label + " count " + n);
  s = s.replace(oldStr, newStr);
  console.log("patched", label);
}

once(
  'return m&&x&&B0(E,r)&&!String(E.id||"").startsWith("smplay_")&&!(E.modes.length>0&&E.modes.every(n=>n==="sm"||n==="smOnline"))',
  'return m&&x&&B0(E,r)&&!String(E.id||"").startsWith("smplay_")',
  "show sm themes"
);

once(
  '{value:"dice",label:"骰子",modes:["diceAction","diceBody"]},]',
  '{value:"dice",label:"骰子",modes:["diceAction","diceBody"]},{value:"sm",label:"SM",modes:["sm","smOnline"]},]',
  "sm filter"
);

once(
  '{value:"diceBody",label:"下骰子部位"}],Os=',
  '{value:"diceBody",label:"下骰子部位"},{value:"sm",label:"SM"},{value:"smOnline",label:"线上"}],Os=',
  "create modes"
);

once(
  '{value:"diceBody",label:"下骰子部位"}];function nf',
  '{value:"diceBody",label:"下骰子部位"},{value:"sm",label:"SM"},{value:"smOnline",label:"线上"}];function nf',
  "editor modes"
);

fs.writeFileSync(file, s);
console.log("wrote", s.length);
