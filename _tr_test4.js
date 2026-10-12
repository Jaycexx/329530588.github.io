async function hit(name, url, opt) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 15000);
  try {
    const r = await fetch(url, { ...opt, signal: ac.signal });
    const text = await r.text();
    console.log("\n==", name, r.status, text.slice(0, 220).replace(/\s+/g, " "));
  } catch (e) {
    console.log("\n==", name, "FAIL", e.cause?.code || e.name, e.message.slice(0, 120));
  } finally {
    clearTimeout(t);
  }
}
(async () => {
  const q = encodeURIComponent("给对方一个拥抱");
  await hit("lingva", "https://lingva.ml/api/v1/zh/en/" + q);
  await hit("simply", "https://simplytranslate.org/api/translate?engine=google&from=zh&to=en&text=" + q);
  await hit("yandex", "https://translate.yandex.net/api/v1.5/tr.json/translate?lang=zh-en&text=" + q);
  await hit("mymemory-vi", "https://api.mymemory.translated.net/get?q=" + q + "&langpair=zh-CN|vi");
  await hit("mymemory-ja", "https://api.mymemory.translated.net/get?q=" + q + "&langpair=zh-CN|ja");
  await hit("mymemory-th", "https://api.mymemory.translated.net/get?q=" + q + "&langpair=zh-CN|th");
  await hit("mymemory-id", "https://api.mymemory.translated.net/get?q=" + q + "&langpair=zh-CN|id");
})();
