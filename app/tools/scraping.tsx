import ScrapingForm from '@/components/ScrapingForm';
const ScrapingFormComponent: React.FC = () => <ScrapingForm />;

/*
const ScrapingFormComponent = ScrapingForm;
*/

const ScrapingPage = () => {
  return (
    <div>
      <h1>Web Scraping</h1>
      <ScrapingForm />
    </div>
  );
};

export default ScrapingPage;

/*
import React from 'react';
import BehavioralClustering from './BehavioralClustering';
import ParallelAutomation from './ParallelAutomation';

const App = () => {
  return (
    <ParallelAutomation>
      {({ browser, page }) => (
        <BehavioralClustering browser={browser} page={page} />
      )}
    </ParallelAutomation>
  );
};

export default App;
*/