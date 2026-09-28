// Renders deck.html to a 16:9 PDF. Usage: PW=<playwright path> node render.cjs <out.pdf>
const { chromium } = require(process.env.PW || "playwright");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto("file://" + path.join(__dirname, "deck.html"));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  await p.pdf({ path: process.argv[2], width: "1920px", height: "1080px", printBackground: true, preferCSSPageSize: true });
  await b.close();
  console.log("pdf written", process.argv[2]);
})();
