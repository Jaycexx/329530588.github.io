async function hit(name, url, opt) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 12000);
  try {
    const r = await fetch(url, { ...opt, signal: ac.signal });
    const text = await r.text();
    console.log("\n==", name, r.status, text.slice(0, 300));
  } catch (e) {
    console.log("\n==", name, "FAIL", e.cause?.code || e.message);
  } finally {
    clearTimeout(t);
  }
}
(async () => {
  const q = "给对方一个拥抱";
  await hit("mymemory", "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(q) + "&langpair=zh-CN|en");
  await hit("libre", "https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q, source: "zh", target: "en", format: "text" }),
  });
  await hit("bing", "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([{ Text: q }]),
  });
})();
