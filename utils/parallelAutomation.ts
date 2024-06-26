import puppeteer from 'puppeteer-core';
import { Cluster } from 'puppeteer-cluster';

export const runParallelAutomation = async (urls: string[], concurrency: number) => {
  const results = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: concurrency,
    monitor: true,
    puppeteerOptions: {
      headless: true,
    },
  });

  await results.task(async ({ page, data: url }: { page: puppeteer.Page, data: string }) => {
    await page.goto(url);
    // Perform web automation tasks here
  });
  const data = await results.execute(urls);
  return data;
};