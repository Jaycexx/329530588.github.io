async function tr(q, tl) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=" +
    tl +
    "&dt=t&q=" +
    encodeURIComponent(q);
  const r = await fetch(url);
  const j = await r.json();
  const text = j[0].map((x) => x[0]).join("");
  console.log(tl, r.status, text);
}
(async () => {
  const q = "被对手从后面伸进衣服抓胸10秒\n---\n给对方一个不少于20秒的拥抱";
  for (const tl of ["en", "vi", "th", "id", "ja"]) await tr(q, tl);
})();
