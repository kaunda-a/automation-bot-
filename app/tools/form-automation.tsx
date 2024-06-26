import FormAutomation from '@/components/FormAutomation';

const FormAutomationPage = () => {
  return (
    <div>
      <h1>Form Automation</h1>
      <FormAutomation />
    </div>
  );
};

export default FormAutomationPage;

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