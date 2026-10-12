const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "assets/index-FYdVXlLD.js");
let s = fs.readFileSync(file, "utf8");

function once(oldStr, newStr, label) {
  const n = s.split(oldStr).length - 1;
  if (n !== 1) throw new Error(label + " count " + n);
  s = s.replace(oldStr, newStr);
}

const helpers = `const LANG_OPTS=[{id:"zh",name:"中文"},{id:"en",name:"English"},{id:"vi",name:"Tiếng Việt"},{id:"th",name:"ไทย"},{id:"id",name:"Indonesia"},{id:"ja",name:"日本語"}];let taskI18n={};let langPair=e0("couples-lang-pair",{a:"zh",b:"en"});if(!LANG_OPTS.some(x=>x.id===langPair.a))langPair.a="zh";if(langPair.b&&!LANG_OPTS.some(x=>x.id===langPair.b))langPair.b="en";function setLangPair(p){langPair={a:p.a||"zh",b:p.b||""};t0("couples-lang-pair",langPair);window.dispatchEvent(new Event("couples-lang"))}function useLangPair(){const[,setTick]=N.useState(0);N.useEffect(()=>{const f=()=>setTick(x=>x+1);window.addEventListener("couples-lang",f);return()=>window.removeEventListener("couples-lang",f)},[]);return langPair}function trWord(w,lang){if(!w||!lang||lang==="zh")return w;const h=taskI18n[w];return h&&h[lang]?h[lang]:w}function dicePhrase(body,action,secs,lang){const b=trWord(body,lang),c=trWord(action,lang);return{en:c+" their "+b+" for "+secs+" seconds",vi:c+" "+b+" của đối phương trong "+secs+" giây",th:c+" ที่"+b+" ของอีกฝ่าย "+secs+" วินาที",id:c+" "+b+" pasangan selama "+secs+" detik",ja:"相手の"+b+"を"+c+"、"+secs+"秒"}[lang]||""}function trLine(line,lang){if(typeof line!=="string"||!line||!lang||lang==="zh")return line;if(taskI18n[line]&&taskI18n[line][lang])return taskI18n[line][lang];let m=line.match(/^亲密骰子：对对方的「(.+)」做「(.+)」，持续 (\\d+) 秒。$/);if(m)return{en:"Intimacy dice: ",vi:"Xúc xắc thân mật: ",th:"ลูกเต๋าใกล้ชิด: ",id:"Dadu intim: ",ja:"親密サイコロ："}[lang]+dicePhrase(m[1],m[2],m[3],lang);m=line.match(/^连锁：做完马上再来，对对方的「(.+)」做「(.+)」，持续 (\\d+) 秒。$/);if(m)return{en:"Chain, right after: ",vi:"Nối tiếp ngay: ",th:"ต่อทันที: ",id:"Lanjut langsung: ",ja:"連鎖、すぐ："}[lang]+dicePhrase(m[1],m[2],m[3],lang);m=line.match(/^对对方的「(.+)」做「(.+)」，持续 (\\d+) 秒。?$/);if(m)return dicePhrase(m[1],m[2],m[3],lang);m=line.match(/^回声：还没有上一张，先做一组骰子。对对方的「(.+)」做「(.+)」，持续 (\\d+) 秒。$/);if(m)return{en:"Echo: no last card yet. Do a dice set. ",vi:"Vọng: chưa có thẻ trước. Làm một lượt xúc xắc. ",th:"ยังไม่มีการ์ดก่อน ทำลูกเต๋าก่อน ",id:"Belum ada kartu tadi. Lakukan dadu. ",ja:"前回がないのでサイコロ："}[lang]+dicePhrase(m[1],m[2],m[3],lang);m=line.match(/^回声：把上一张再做一遍，力度你定，至少 20 秒。上一张是「([\\s\\S]*)」。$/);if(m){const clip=taskI18n[m[1]]&&taskI18n[m[1]][lang]?taskI18n[m[1]][lang]:m[1];return{en:'Echo: do the last card again, you choose the intensity, at least 20 seconds. Last: "'+clip+'"',vi:'Làm lại thẻ trước, bạn chọn lực, ít nhất 20 giây. Thẻ trước: "'+clip+'"',th:'ทำใบก่อนอีกครั้ง กำหนดแรงเอง อย่างน้อย 20 วินาที ใบก่อน: "'+clip+'"',id:'Ulangi kartu tadi, kamu tentukan kekuatannya, minimal 20 detik. Kartu tadi: "'+clip+'"',ja:'エコー：前のカードをもう一度。強さは自分で、最低20秒。前：「'+clip+'」'}[lang]}if(line.startsWith("姿势：")){let rest=line.slice(3);const riders=["保持这个姿势 30 秒，中途不许笑场。","用这个姿势慢慢动 15 下。","换成这个姿势，让对方掌控节奏 30 秒。","用这个姿势贴着亲吻并磨蹭 20 秒。"];for(const r of riders){const at=rest.indexOf(r);if(at>=0){const label=rest.slice(0,at);return{en:"Position: ",vi:"Tư thế: ",th:"ท่า: ",id:"Posisi: ",ja:"体位："}[lang]+label+trLine(r,lang)}}}if(line.startsWith("没指定姿势，随机：")){const rest=line.slice("没指定姿势，随机：".length),tail="按图做。",label=rest.endsWith(tail)?rest.slice(0,-tail.length):rest;return trLine("没指定姿势，随机：",lang)+label+(rest.endsWith(tail)?trLine(tail,lang):"")}m=line.match(/^你来做：([\s\S]+)$/);if(m)return{en:"You do: ",vi:"Bạn làm: ",th:"คุณทำ: ",id:"Kamu lakukan: ",ja:"あなたがやる："}[lang]+trLine(m[1],lang);m=line.match(/^(.+?) 来做：([\s\S]+)$/);if(m)return{en:m[1]+" does: ",vi:m[1]+" làm: ",th:m[1]+" ทำให้: ",id:m[1]+" lakukan: ",ja:m[1]+"がやる："}[lang]+trLine(m[2],lang);if(line.endsWith("。")){const bare=line.slice(0,-1),hit=trLine(bare,lang);if(hit!==bare)return hit}return line}function biText(text){if(typeof text!=="string"||!text)return text;const a=langPair.a||"zh",b=langPair.b||"";return text.split("\\n").map(line=>{const x=trLine(line,a);if(!b||b===a)return x;const y=trLine(line,b);if(!line.trim()||x===y)return x;return x+"\\n"+y}).join("\\n")}function LangPick(){useLangPair();const p=langPair;const on=(slot,v)=>setLangPair({...p,[slot]:v});const sel=slot=>a.jsxs("select",{"aria-label":slot==="a"?"词条语言一":"词条语言二",value:slot==="b"?p.b||"":p.a,onChange:e=>on(slot,e.target.value),className:"bg-[#2C2C2E] text-white text-xs rounded-full px-2 py-1 border border-white/10 max-w-[9.5rem]",children:[slot==="b"?a.jsx("option",{value:"",children:"单语"}):null,...LANG_OPTS.map(L=>a.jsx("option",{value:L.id,children:L.name},L.id))]},slot);return a.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[a.jsx("span",{className:"text-[11px] text-gray-500",children:"词条"}),sel("a"),a.jsx("span",{className:"text-[11px] text-gray-600",children:"+"}),sel("b")]})}function BiTask({text:e}){useLangPair();const aL=langPair.a||"zh",bL=langPair.b||"",lines=String(e||"").split("\\n");return a.jsx("div",{className:"w-full flex flex-col gap-2",children:lines.map((line,i)=>{const x=trLine(line,aL),y=bL&&bL!==aL?trLine(line,bL):"";return a.jsxs("div",{children:[a.jsx("p",{className:"text-base font-medium text-white text-center leading-relaxed whitespace-pre-wrap",children:x||" "}),y&&y!==x?a.jsx("p",{className:"text-sm text-gray-400 text-center leading-relaxed whitespace-pre-wrap mt-1",children:y}):null]},i)})})}queueMicrotask(()=>{try{const sc=[...document.scripts].find(x=>/index-FYdVXlLD\\.js/.test(x.src));const url=sc?new URL("task-i18n.json?v=lang2",sc.src).href:"task-i18n.json?v=lang2";fetch(url).then(r=>r.json()).then(d=>{taskI18n=d||{};window.dispatchEvent(new Event("couples-lang"))}).catch(()=>{})}catch(e){}});`;

once(
  'function t0(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){console.error("Error saving to localStorage:",o)}}',
  'function t0(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(o){console.error("Error saving to localStorage:",o)}}' + helpers,
  "helpers"
);

once(
  'function T0({players:e,themes:t,gameMode:o,onSelectMode:r,onSelectTheme:n,onStartGame:l,smSets:ss,onToggleSmSet:st,boardThemeId:bt,onPickBoardTheme:bp}){const i=',
  'function T0({players:e,themes:t,gameMode:o,onSelectMode:r,onSelectTheme:n,onStartGame:l,smSets:ss,onToggleSmSet:st,boardThemeId:bt,onPickBoardTheme:bp}){useLangPair();const i=',
  "T0 hook"
);

once(
  '"选择游戏模式即可开始"})]})',
  '"选择游戏模式即可开始"}),a.jsx(LangPick,{})]})',
  "home picker"
);

once(
  'function Y0({isOpen:e,taskData:t,onAccept:o,onSoften:soft,onSwap:swap,onYield:yieldTurn,swapsLeft:swaps}){const[n,l]=N.useState(!1)',
  'function Y0({isOpen:e,taskData:t,onAccept:o,onSoften:soft,onSwap:swap,onYield:yieldTurn,swapsLeft:swaps}){useLangPair();const[n,l]=N.useState(!1)',
  "Y0 hook"
);

once(
  'a.jsxs("div",{className:"w-full bg-[#2C2C2E] rounded-xl p-4 min-h-[96px] flex flex-col items-center justify-center border border-white/5 mb-4",children:[i.poseSrc&&a.jsx("img",{src:i.poseSrc,alt:i.poseLabel||"随机姿势",style:{width:"100%",maxHeight:"9rem",objectFit:"contain",borderRadius:"12px",marginBottom:"8px",background:"rgba(0,0,0,.3)"}}),a.jsx("p",{className:"text-base font-medium text-white text-center leading-relaxed whitespace-pre-wrap",children:i.task})]})',
  'a.jsxs("div",{className:"w-full bg-[#2C2C2E] rounded-xl p-4 min-h-[96px] max-h-[46vh] overflow-y-auto flex flex-col items-center justify-center border border-white/5 mb-4 gap-3",children:[i.poseSrc&&a.jsx("img",{src:i.poseSrc,alt:i.poseLabel||"随机姿势",style:{width:"100%",maxHeight:"9rem",objectFit:"contain",borderRadius:"12px",marginBottom:"8px",background:"rgba(0,0,0,.3)"}}),a.jsx(LangPick,{}),a.jsx(BiTask,{text:i.task})]})',
  "card body"
);

once(
  'function _s({players:e,themes:t,currentTurn:o,onDrawTask:r,onTaskTrigger:n,onBack:l,badge:i="抽卡",safetyNote:s}){const u=',
  'function _s({players:e,themes:t,currentTurn:o,onDrawTask:r,onTaskTrigger:n,onBack:l,badge:i="抽卡",safetyNote:s}){useLangPair();const u=',
  "_s hook"
);

once(
  'children:item.task}',
  'children:biText(item.task)}',
  "trio text"
);

once(
  'function nf({isOpen:e,theme:t,onClose:o,onSaveMeta:r,onAddTask:n,onUpdateTask:l,onRemoveTask:i,onOpenAiImport:s}){const[u,c]=N.useState("")',
  'function nf({isOpen:e,theme:t,onClose:o,onSaveMeta:r,onAddTask:n,onUpdateTask:l,onRemoveTask:i,onOpenAiImport:s}){useLangPair();const[u,c]=N.useState("")',
  "nf hook"
);

once(
  'children:D.text}',
  'children:biText(D.text)}',
  "editor text"
);

once(
  'children:"保存"})]}),a.jsxs("div",{className:"space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-10",children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx("div",{className:"text-xs text-gray-400",children:"主题名称"})',
  'children:"保存"})]}),a.jsxs("div",{className:"space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-10",children:[a.jsx(LangPick,{}),a.jsxs("div",{className:"space-y-2",children:[a.jsx("div",{className:"text-xs text-gray-400",children:"主题名称"})',
  "editor picker"
);

fs.writeFileSync(file, s);
console.log("patched", s.length);
