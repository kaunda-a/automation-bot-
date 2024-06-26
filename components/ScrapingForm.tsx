// ScrapingForm.tsx
import React, { useState } from 'react';
import ScrapingResults from './ScrapingResults';
import { scrapeWebsite } from '../utils/scraping';

const ScrapingForm = () => {
  const [url, setUrl] = useState('');
  const [targetElements, setTargetElements] = useState('');
  // Specify the type of elements in the array as string[]
  const [scrapedData, setScrapedData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Call scraping function with url and targetElements
    const data = await scrapeWebsite(url, targetElements);
    setScrapedData([...data]); // Spread the data into a new array to ensure type compatibility
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter target elements (e.g., 'h1, p, img')"
          value={targetElements}
          onChange={(e) => setTargetElements(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Scraping...' : 'Scrape Data'}
        </button>
      </form>
      {scrapedData.length > 0 && <ScrapingResults data={scrapedData} />}
    </div>
  );
};

export default ScrapingForm;