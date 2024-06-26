import ScheduledTasks from '@/components/ScheduledTasks';

const ScheduledTasksPage = () => {
  return (
    <div>
      <h1>Scheduled Tasks</h1>
      <ScheduledTasks />
    </div>
  );
};

export default ScheduledTasksPage;


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