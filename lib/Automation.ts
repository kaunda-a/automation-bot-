/*
### 1. **Advanced Interaction Timing**

Randomized Click Intervals: Instead of fixed delays, use a distribution that more closely matches human reaction times, such as a log-normal distribution.
Behavioral Patterns: Implement patterns that simulate how a human might browse through a site, such as random scrolling, occasional backtracking, and varied speeds of interaction.

*/
import { randomLogNormal, randomUniform } from '../utils/randomUtils';

export async function Automate(url: string, durationSeconds: number) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const startTime = Date.now();
  const endTime = startTime + durationSeconds * 1000;

  while (Date.now() < endTime) {
    // Simulate human-like browsing behavior
    await simulateHumanBrowsing(page);

    // Randomized delay before next interaction
    const delayMs = randomLogNormal(500, 1000); // Adjust parameters as needed
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  await browser.close();
  return `Automated browsing on ${url} for ${durationSeconds} seconds`;
}

async function simulateHumanBrowsing(page: puppeteer.Page) {
  const action = randomUniform(0, 4); // Choose a random action

  switch (action) {
    case 0:
      // Click a random link
      await clickRandomLink(page);
      break;
    case 1:
      // Scroll randomly
      await randomScroll(page);
      break;
    case 2:
      // Backtrack
      await page.goBack();
      break;
    case 3:
      // Vary interaction speed
      await varyInteractionSpeed(page);
      break;
    default:
      break;
  }
}

async function clickRandomLink(page: puppeteer.Page) {
  const links = await page.$$eval('a', (links) => links.map((link) => link.href));
  const randomLink = links[Math.floor(Math.random() * links.length)];
  await page.goto(randomLink);
}

async function randomScroll(page: puppeteer.Page) {
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const randomY = Math.random() * scrollHeight;
  await page.evaluate((y) => window.scrollTo(0, y), randomY);
}

async function varyInteractionSpeed(page: puppeteer.Page) {
  const speed = randomUniform(0.5, 2); // Adjust speed range as needed
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument(`
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => {
      return originalRequestAnimationFrame(() => callback(${speed}));
    };
  `);
}
