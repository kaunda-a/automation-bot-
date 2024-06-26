import puppeteer from 'puppeteer-core';

export const scrapeWebsite = async (url: string, targetElements: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const scrapedData = await page.evaluate((targetElements) => {
    const elements = document.querySelectorAll(targetElements);
    return Array.from(elements).map((element) => element.outerHTML);
  }, targetElements);

  await browser.close();
  return scrapedData;
};
