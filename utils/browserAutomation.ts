// browserAutomation.ts
import puppeteer, { Browser, Page } from 'puppeteer';
import { randomBytes } from 'crypto';
import { randomLogNormal, randomUniform } from './randomUtils';
import { solveCaptcha } from './captchaSolver'; // Import the CAPTCHA solver function


// Function to automate website interaction
export async function automateWebsiteInteraction(
  url: string,
  durationSeconds: number,
  handleCaptchaEncountered: (captchaImageUrl: string) => void
) {
  const browser = await puppeteer.launch({
    headless: false, // Set to true to run in headless mode
    args: ['--start-maximized'], // Start browser in maximized mode
  });
  const page = await browser.newPage();

  try {
    // Navigate to the website
    await page.goto(url);

    const startTime = Date.now();
    const endTime = startTime + durationSeconds * 1000;

    while (Date.now() < endTime) {
      // Check for CAPTCHA
      const captchaImageUrl = await checkForCaptcha(page);
      if (captchaImageUrl) {
        const solution = await solveCaptcha(captchaImageUrl); // Solve the CAPTCHA
        await handleCaptchaSolution(page, solution);
        handleCaptchaEncountered(captchaImageUrl);
        // Wait for CAPTCHA to be solved before continuing
        await new Promise((resolve) => {});
      }

      // Interact with the website
      await clickAds(page, browser);
      await simulateHumanBehavior(page);

      // Randomized delay before next interaction
      const delayMs = randomLogNormal(500, 1000); // Adjust parameters as needed
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  } catch (error) {
    console.error('Error during website interaction:', error);
  } finally {
    await browser.close();
  }
}

// Function to click on ad elements
async function clickAds(page: Page, browser: Browser) {
  // Find and click on ad elements
  const adElements = await page.$$eval('a[href*="ad_url"]', (elements: any) =>
    elements.map((element: any) => element.href)
  );

  for (const adUrl of adElements) {
    const newPage = await browser.newPage();
    await newPage.goto(adUrl);
    // Perform additional actions on the ad page if needed
    await simulateHumanBehavior(newPage);
    await newPage.close();
  }
}

// Enhanced function to simulate human-like behavior
async function simulateHumanBehavior(page: Page) {
  // More complex mouse movements
  const viewportSize = await page.viewport();
  if (viewportSize) {
    let x = Math.floor(Math.random() * viewportSize.width);
    let y = Math.floor(Math.random() * viewportSize.height);
    await page.mouse.move(x, y, { steps: 10 });
    await page.mouse.click(x, y);
  }

  // Randomized keyboard interactions
  const searchInputs = await page.$$('input[type="text"]');
  if (searchInputs.length > 0) {
    const input = searchInputs[Math.floor(Math.random() * searchInputs.length)];
    await input.click();
    const text = 'Hello';
    for (let char of text) {
      await page.keyboard.type(char, { delay: Math.random() * 120 });
    }
    await page.keyboard.press('Enter');
  }

  // More human-like scrolling
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight / 4);
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.evaluate(() => {
    window.scrollBy(0, -window.innerHeight / 4);
  });

  // Move the mouse cursor randomly
  await moveMouse(page);
  // Introduce a random delay
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));
}

// Function to move the mouse cursor randomly
async function moveMouse(page: Page) {
  const viewportSize = await page.viewport();
  if (viewportSize) {
    const x = Math.floor(Math.random() * viewportSize.width);
    const y = Math.floor(Math.random() * viewportSize.height);
    await page.mouse.move(x, y);
  }
}

// Function to generate a random delay between 2 and 10 seconds
function getRandomDelay() {
  return Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
}

// Function to generate a random user agent string
function getRandomUserAgent() {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:54.0) Gecko/20100101 Firefox/54.0',
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Function to generate a random fingerprint
function getRandomFingerprint() {
  return randomBytes(16).toString('hex');
}


// Function to handle CAPTCHA solution
async function handleCaptchaSolution(page: Page, solution: string) {
  // Implement your logic to handle the CAPTCHA solution
  // For example, you can type the solution into an input field or submit a form
  console.log('Handling CAPTCHA solution:', solution);
}

// Function to check for CAPTCHA
async function checkForCaptcha(page: Page): Promise<string | null> {
  // Implement your logic to detect CAPTCHAs on the page
  // If a CAPTCHA is detected, return the URL of the CAPTCHA image
  // Otherwise, return null

  // Example: Check if there's an image with the alt text "CAPTCHA"
  const captchaImage = await page.$eval('img[alt="CAPTCHA"]', (img) => img?.src);
  if (captchaImage) {
    return captchaImage;
  }

  return null;
}