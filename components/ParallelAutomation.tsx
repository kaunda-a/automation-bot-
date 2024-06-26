// components/parallelAutomation.tsx 
"use client";

import React, { useState } from 'react';
import { Browser } from 'puppeteer';
import { runParallelAutomation } from '../utils/parallelAutomation';
import { automateWebsiteInteraction } from '../utils/browserAutomation';
import CaptchaSolver from './CaptchaSolver';

import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface ParallelAutomationProps {
  browser: Browser;
}
const ParallelAutomation: React.FC<ParallelAutomationProps> = ({ browser }) => {
  const [urls, setUrls] = useState([""]);
  const [concurrency, setConcurrency] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptchaSolved = (solution: string) => {
    // Handle the CAPTCHA solution here
    console.log("CAPTCHA solved:", solution);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Call parallel automation function with urls and concurrency
    const automationTasks = urls.map((url) =>
      automateWebsiteInteraction(url, 60, handleCaptchaSolved)
    ); // Interact for 60 seconds
    const res = await runParallelAutomation(urls, concurrency);
    setResults(res);
    setIsLoading(false);
  };
  const handleUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newUrls = [...urls];
    newUrls[index] = e.target.value;
    setUrls(newUrls);
  };

  const addUrl = () => {
    setUrls([...urls, ""]);
  };

  const removeUrl = (index: number) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => handleUrlChange(e, index)}
          />
          <button type="button" onClick={() => removeUrl(index)}>
            Remove
          </button>
        </div>
      ))}
      <div className="m-40 flex justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          onClick={addUrl}
        >
          <span>Add URL</span>
        </HoverBorderGradient>
      </div>
      <input
        type="number"
        placeholder="Enter concurrency"
        value={concurrency}
        onChange={(e) => setConcurrency(parseInt(e.target.value))}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Running..." : "Run Parallel Automation"}
      </button>
      {results.length > 0 && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
      <CaptchaSolver onCaptchaSolved={handleCaptchaSolved} />
    </form>
  );
  
};

export default ParallelAutomation;