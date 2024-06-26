// components/RealisticBrowsing.tsx
import React, { useEffect, useState } from 'react';
import { Browser, Page } from 'puppeteer';
import { randomLogNormal } from '../utils/randomUtils';

interface RealisticBrowsingProps {
  browser: Browser;
  page: Page;
}

const RealisticBrowsing: React.FC<RealisticBrowsingProps> = ({ browser, page }) => {
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

  useEffect(() => {
    const handleSession = async () => {
      setIsSessionActive(true);

      // Mimic cookie acceptance behavior
      await mimicCookieAcceptance(page);

      // Vary session duration
      const duration = randomLogNormal(300, 120); // Mean: 300 seconds, Sigma: 120 seconds
      setSessionDuration(duration);

      // Simulate session activity
      await simulateSessionActivity(page, duration);

      setIsSessionActive(false);
    };

    handleSession();
  }, [browser, page]);

  return (
    <div>
      {isSessionActive ? (
        <p>Session active for {sessionDuration} seconds</p>
      ) : (
        <p>Session inactive</p>
      )}
    </div>
  );
};

async function mimicCookieAcceptance(page: Page) {
  // Implement your logic to mimic cookie acceptance behavior
  // For example, you can wait for a random delay before accepting cookies
  const delay = randomLogNormal(10, 5); // Mean: 10 seconds, Sigma: 5 seconds
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  console.log('Accepted cookies');
}

async function simulateSessionActivity(page: Page, duration: number) {
  const startTime = Date.now();
  const endTime = startTime + duration * 1000;

  while (Date.now() < endTime) {
    // Implement your logic to simulate session activity
    // For example, you can navigate to different pages, scroll, click links, etc.
    console.log('Simulating session activity');

    // Introduce a random delay between activities
    const delay = randomLogNormal(5, 2); // Mean: 5 seconds, Sigma: 2 seconds
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }
}

export default RealisticBrowsing;
