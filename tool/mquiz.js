/*MQ_START*/
const mqIcon=$("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"mq1"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"mq2"}],["path",{d:"M12 11h4",key:"mq3"}],["path",{d:"M12 16h4",key:"mq4"}],["path",{d:"M8 11h.01",key:"mq5"}],["path",{d:"M8 16h.01",key:"mq6"}]]);
const MQ_LEVELS=[{id:"SSS",name:"非常喜欢"},{id:"SS",name:"喜欢"},{id:"S",name:"无所谓"},{id:"Q",name:"不喜欢但会做"},{id:"N",name:"绝不"},{id:"W",name:"未知"}];
const MQ_ON={SSS:"bg-[#FF453A] text-white border-[#FF453A]",SS:"bg-[#FF9F0A] text-black border-[#FF9F0A]",S:"bg-[#64D2FF] text-black border-[#64D2FF]",Q:"bg-[#BF5AF2] text-white border-[#BF5AF2]",N:"bg-white text-black border-white",W:"bg-[#8E8E93] text-white border-[#8E8E93]"};
const MQ_SHEETS=[
{id:"f",name:"女M",title:"女M自评报告",legend:"SSS 非常喜欢 · SS 喜欢 · S 无所谓 · Q 不喜欢但会做 · N 绝不 · W 未知",groups:[
{name:"性奴",items:["强奸","轮奸","口爆","颜射","内射","肛交","器具折磨","强制高潮","潮吹失禁","自慰展示","禁止高潮","扩张阴道","扩张肛门","双阳具插入","多阳具插入"]},
{name:"犬奴",items:["囚笼关押","项圈镣铐","喂食","爬行","舔足","踩踏","骑乘"]},
{name:"玩偶奴",items:["角色扮演","制服诱惑","人偶装扮","乳环","阴环","脐环","剃毛","内窥镜研究","性工具研究","作为艺术品","作为家具","作为烟灰缸","作为女仆","限制说话内容、时间"]},
{name:"野奴",items:["野外暴露","野外奴役","野外流放","野外玩弄","公共场合暴露","公共场合玩弄","公开场合捆绑(衣服内)","公开场合器具(衣服内)","露阴(向朋友)","露阴(向生人)","贞操带","公开场合项圈"]},
{name:"兽奴",items:["兽交","群兽轮交","人兽同交"]},
{name:"刑奴",items:["耳光","口塞","扯头发","皮带","鞭子","藤条","木板","棍棒","毛刷","虐阴","紧缚","吊缚","拘束","乳夹","乳头承重","阴火","电击","滴蜡","针刺","穿孔","烙印","刺青","切割","火刑","水刑","窒息","冰块"]},
{name:"厕奴",items:["舔精","吞精","唾液","喝尿","尿浴","舔阴","放尿","灌肠","舔肛","排便","粪浴","吃粪","吃痰","吃经血"]},
{name:"心奴",items:["言语侮辱","人格侮辱","思维控制","视觉性骚扰","网络控制","语言管教","多奴调教","多主调教","网络公调"]},
{name:"其他",items:["羞辱","长期圈养","短期圈养"]}
]},
{id:"m",name:"男M",title:"男M自评报告",legend:"SSS 非常喜欢 · SS 喜欢 · S 无所谓，不排斥不喜爱 · Q 不喜欢，但有要求会做 · W 未知、不确定 · N 绝不",groups:[
{name:"恋足",items:["足交","闻脚","舔足(无味)","舔足(厚味)","舔袜(无味)","舔袜(厚味)","袜堵嘴","舔鞋(调教用)","舔鞋(户外穿)","足喂食","喝洗脚水","足深喉","踩打","裸足踩踏","高跟鞋踩踏"]},
{name:"性奴",items:["舔阴","舔肛","禁止射精","自慰表演","器具折磨","强制射精","舔食自己精液","肛门插入","尿道插入","马眼插入","木马","阳具插入","狗姿","项圈","镣铐","看门"]},
{name:"狗奴",items:["狗爬","室内遛狗","趴路","狗爬尿","狗舔食","口吐食","口水","舔盆","狗装","狗叫","内裤套头","舔内裤(厚味)","烟灭鞋","狗笼关押","圈禁饲养","骑马"]},
{name:"性玩具",items:["角色扮演","乳环","龟头环","肛环","贞操锁","肛塞","身上写字(可洗)","身上写字(不洗)","CD伪装","剃光头","剃毛","性工具玩弄","固定在桌椅上","坐脸"]},
{name:"兽奴",items:["灌肠(温和液体)","灌肠(刺激液体)","拍照/录像(不露脸)","拍照/录像(露脸)","作为玩具","作为家具","作为男仆","兽交","群兽轮交","兽虐","昆虫爬身"]},
{name:"野奴",items:["野外暴露","野外奴役","野外流放","野外玩弄","公共场合暴露","公共场合玩弄","公共场合捆绑","公共场合器具","市场锁","露阴(熟人)","露阴(生人)","野外遛狗"]},
{name:"刑奴",items:["耳光","阴茎抽打","鞭打","木板拍打","毛刷","柴刷","口塞","吊缚","拘束","捆绑","控制呼吸","乳夹","乳头承重","阴囊夹子","阴茎吊重物","阴囊吊重物","鞭打阳具","踢裆","熏香","电击","低温滴蜡","高温滴蜡","湿烤","针刺","穿孔","烙印","身体改造","阉割","木乃伊","水刑","火刑","冰块"]},
{name:"心奴",items:["语言侮辱","言语侮辱","人格侮辱","思维控制","网络控制","网络公调","短期圈养","长期圈养","多奴调教","多主调教"]},
{name:"家奴",items:["熟人旁观","生人旁观","熟人侮辱","生人侮辱","剃光睡眠","催眠","家务","伺候","伺候小便","伺候大便","圣水浴","喝圣水","圣水食物"]},
{name:"厕奴",items:["舔舐肛部","黄金浴","吃黄金","清洁马桶","吃口水","尿液灌肠"]}
]}
];
const MQ_STORE="mquiz-v1";
function mqKey(sheet,group,item){return sheet+"\n"+group+"\n"+item}
function MQuiz(){
const saved=e0(MQ_STORE,{sheet:"f",rates:{}});
const [sheet,setSheet]=N.useState(saved.sheet==="m"?"m":"f");
const [rates,setRates]=N.useState(saved.rates&&typeof saved.rates==="object"?saved.rates:{});
const [cat,setCat]=N.useState("all");
const [only,setOnly]=N.useState("all");
const [q,setQ]=N.useState("");
const [tip,setTip]=N.useState("");
N.useEffect(()=>{t0(MQ_STORE,{sheet,rates})},[sheet,rates]);
const spec=MQ_SHEETS.find(x=>x.id===sheet)||MQ_SHEETS[0];
const query=q.trim();
let total=0,filled=0;
const tally={};
MQ_LEVELS.forEach(l=>{tally[l.id]=0});
spec.groups.forEach(g=>{g.items.forEach(item=>{total++;const lv=rates[mqKey(sheet,g.name,item)];if(lv){filled++;if(tally[lv]!=null)tally[lv]++}})});
const visible=spec.groups.map(g=>{
const items=g.items.filter(item=>{
if(query&&item.indexOf(query)<0)return false;
const lv=rates[mqKey(sheet,g.name,item)];
if(only==="empty")return !lv;
if(only!=="all")return lv===only;
return true;
});
return {name:g.name,total:g.items.length,done:g.items.filter(item=>rates[mqKey(sheet,g.name,item)]).length,items};
}).filter(g=>(cat==="all"||g.name===cat)&&g.items.length);
function pickSheet(id){setSheet(id);setCat("all");setOnly("all");setQ("")}
function setRate(key,id){setRates(prev=>{const next={...prev};if(next[key]===id)delete next[key];else next[key]=id;return next})}
function flash(text){setTip(text);window.setTimeout(()=>setTip(""),1400)}
function report(){
const lines=[spec.title,spec.legend,""];
spec.groups.forEach(g=>{
lines.push("【"+g.name+"】");
g.items.forEach(item=>{lines.push(item+"　"+(rates[mqKey(sheet,g.name,item)]||"—"))});
lines.push("");
});
lines.push("已填 "+filled+" / "+total);
MQ_LEVELS.forEach(l=>{lines.push(l.id+" "+l.name+"　"+tally[l.id])});
return lines.join("\n");
}
function copyReport(){
const text=report();
const done=()=>flash("已复制这张表");
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(done).catch(()=>{fallbackCopy(text);done()});return}
fallbackCopy(text);done();
}
function fallbackCopy(text){
const el=document.createElement("textarea");
el.value=text;el.setAttribute("readonly","");el.style.position="fixed";el.style.left="-9999px";
document.body.appendChild(el);el.select();
try{document.execCommand("copy")}catch(err){}
document.body.removeChild(el);
}
function clearSheet(){
if(!window.confirm("清空「"+spec.title+"」里已经勾过的级别？另一张表会保留。"))return;
setRates(prev=>{const next={...prev};const prefix=sheet+"\n";Object.keys(next).forEach(k=>{if(k.indexOf(prefix)===0)delete next[k]});return next});
flash("已清空");
}
const filters=[{id:"all",name:"全部"},{id:"empty",name:"未填"}].concat(MQ_LEVELS.map(l=>({id:l.id,name:l.id})));
return a.jsxs("div",{className:"space-y-6 pb-8 min-w-0",children:[
a.jsxs("div",{className:"sticky top-0 z-20 pt-2 pb-4 bg-black/95 space-y-3 min-w-0",children:[
a.jsxs("div",{className:"flex items-center justify-between gap-3",children:[
a.jsx("div",{className:"flex rounded-full bg-[#1C1C1E] p-1 border border-white/5",children:MQ_SHEETS.map(item=>a.jsx("button",{type:"button",onClick:()=>pickSheet(item.id),className:"px-4 py-1.5 rounded-full text-sm font-semibold ios-btn "+(sheet===item.id?"bg-white text-black":"text-gray-400"),children:item.name},item.id))}),
a.jsxs("div",{className:"text-xs text-gray-400 tabular-nums",children:[filled," / ",total]})
]}),
a.jsx("div",{className:"h-1.5 rounded-full bg-white/10 overflow-hidden",children:a.jsx("div",{className:"h-full bg-white rounded-full transition-all",style:{width:(total?Math.round(filled/total*100):0)+"%"}})}),
a.jsx("div",{className:"text-[11px] leading-relaxed text-gray-500",children:spec.legend}),
a.jsx("div",{className:"flex flex-wrap gap-2 min-w-0",children:[{name:"全部",id:"all"}].concat(spec.groups.map(g=>({name:g.name,id:g.name}))).map(item=>a.jsx("button",{type:"button",onClick:()=>setCat(item.id),className:"px-3 py-1.5 rounded-full text-xs border ios-btn "+(cat===item.id?"bg-white text-black border-white":"bg-[#1C1C1E] text-gray-300 border-white/10"),children:item.name},item.id))}),
a.jsx("input",{value:q,onChange:e=>setQ(e.target.value),placeholder:"搜索项目",className:"w-full bg-[#1C1C1E] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none"}),
a.jsx("div",{className:"flex flex-wrap gap-2 min-w-0",children:filters.map(item=>a.jsx("button",{type:"button",onClick:()=>setOnly(item.id),className:"px-3 py-1.5 rounded-full text-xs border ios-btn "+(only===item.id?(MQ_ON[item.id]||"bg-white text-black border-white"):"bg-[#1C1C1E] text-gray-400 border-white/10"),children:item.id==="all"||item.id==="empty"?item.name:item.name+" "+(tally[item.id]||0)},item.id))}),
a.jsxs("div",{className:"flex gap-3 pt-1",children:[
a.jsx("button",{type:"button",onClick:copyReport,className:"flex-1 h-11 rounded-full bg-white text-black text-sm font-semibold ios-btn",children:tip||"复制这张表"}),
a.jsx("button",{type:"button",onClick:clearSheet,className:"h-11 px-5 rounded-full bg-[#1C1C1E] text-gray-300 text-sm border border-white/10 ios-btn",children:"清空"})
]})
]}),
visible.length?visible.map(g=>a.jsxs("section",{className:"space-y-3",children:[
a.jsxs("div",{className:"flex items-baseline justify-between px-1",children:[
a.jsx("h3",{className:"text-sm font-semibold text-white",children:g.name}),
a.jsxs("span",{className:"text-[11px] text-gray-500 tabular-nums",children:[g.done,"/",g.total]})
]}),
a.jsx("div",{className:"space-y-3",children:g.items.map(item=>{
const key=mqKey(sheet,g.name,item);
const lv=rates[key]||"";
const meta=MQ_LEVELS.find(l=>l.id===lv);
return a.jsxs("div",{className:"rounded-2xl bg-[#1C1C1E] border border-white/5 p-4",children:[
a.jsxs("div",{className:"flex items-center justify-between gap-3 mb-3",children:[
a.jsx("div",{className:"text-sm text-white leading-snug",children:item}),
a.jsx("div",{className:"text-[11px] shrink-0 "+(lv?"text-white":"text-gray-600"),children:meta?meta.name:"未填"})
]}),
a.jsx("div",{className:"grid grid-cols-6 gap-2",children:MQ_LEVELS.map(level=>a.jsx("button",{type:"button",title:level.name,"aria-pressed":lv===level.id,onClick:()=>setRate(key,level.id),className:"h-9 rounded-xl border text-xs font-semibold ios-btn "+(lv===level.id?MQ_ON[level.id]:"bg-white/5 text-gray-400 border-white/10"),children:level.id},level.id))})
]},key);
})})
]},g.name)):a.jsx("div",{className:"text-sm text-gray-500 text-center py-6",children:"这一档没有项目"})
]});
}
/*MQ_END*/
