// components/BehavioralClustering.tsx
import React, { useState, useEffect } from 'react';
import { Browser, Page } from 'puppeteer';
import { simulateHumanBrowsing } from '../../lib/simulateHumanBrowsing';

interface BehavioralClusteringProps {
  browser: Browser;
  page: Page;
}

const BehavioralClustering: React.FC<BehavioralClusteringProps> = ({ browser, page }) => {
  const [browsingPattern, setBrowsingPattern] = useState<string>('normal');
  const [isAnomalous, setIsAnomalous] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPattern = Math.random() < 0.8 ? 'normal' : 'anomalous';
      setBrowsingPattern(randomPattern);
      setIsAnomalous(randomPattern === 'anomalous');
    }, 10000); // Change pattern every 10 seconds (for demonstration purposes)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const simulateBrowsing = async () => {
      if (browsingPattern === 'normal') {
        await simulateHumanBrowsing(page, 'normal');
      } else {
        await simulateHumanBrowsing(page, 'anomalous');
      }
    };

    simulateBrowsing();
  }, [browsingPattern, page]);

  return (
    <div>
      <p>Current browsing pattern: {browsingPattern}</p>
      {isAnomalous && <p>Anomalous behavior detected!</p>}
    </div>
  );
};

export default BehavioralClustering;
