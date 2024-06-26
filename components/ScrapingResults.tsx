import React from 'react';

const ScrapingResults = ({ data }: { data: any }) => {
  return (
    <div>
      <h2>Scraped Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ScrapingResults;