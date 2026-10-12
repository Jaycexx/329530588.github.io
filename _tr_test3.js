(async () => {
  const auth = await fetch("https://edge.microsoft.com/translate/auth");
  console.log("auth", auth.status, (await auth.text()).slice(0, 80));
})().catch((e) => console.log("FAIL", e.message));
