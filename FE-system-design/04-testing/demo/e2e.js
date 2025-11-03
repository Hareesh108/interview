const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();

  await page.goto("https://hareesh.is-a.dev");

  console.log("Web loaded..");

  await page.setViewport({ width: 1920, height: 1080 });

  const selector =
    "body > div.relative.min-h-screen > div.fixed.bottom-8.left-1/2.transform.-translate-x-1/2.z-50.undefined > div > div.relative.bg-white/10.dark:bg-black/10.backdrop-blur-xl.border.border-white/20.dark:border-white/10.rounded-2xl.transition-all.duration-500.overflow-hidden.shadow-2xl > div.relative.px-6.py-3 > div > div.flex.items-center.justify-center.w-10.h-10.bg-white/20.dark:bg-white/10.backdrop-blur-md.border.border-white/30.dark:border-white/20.hover:bg-white/30.dark:hover:bg-white/20.rounded-xl.transition-all.duration-300.shadow-lg";

  await page.waitForSelector(selector);

  await page.click(selector);
})();
