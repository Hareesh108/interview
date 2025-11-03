const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();

  await page.goto("https://namastedev.com/");

  console.log("Web loaded..");

    await page.setViewport({ width: 1620, height: 1080 });

})();
