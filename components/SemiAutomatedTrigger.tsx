// components/SemiAutomatedTrigger.tsx
import React, { useState } from 'react';

interface SemiAutomatedTriggerProps {
  onTrigger: (action: string) => void;
  sensitiveActions: string[];
}

const SemiAutomatedTrigger: React.FC<SemiAutomatedTriggerProps> = ({
  onTrigger,
  sensitiveActions,
}) => {
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const handleTrigger = (action: string) => {
    if (sensitiveActions.includes(action)) {
      setPendingAction(action);
    } else {
      onTrigger(action);
    }
  };

  const confirmAction = () => {
    if (pendingAction) {
      onTrigger(pendingAction);
      setPendingAction(null);
    }
  };

  const cancelAction = () => {
    setPendingAction(null);
  };

  return (
    <div>
      {pendingAction ? (
        <div>
          <p>Confirm sensitive action: {pendingAction}</p>
          <button onClick={confirmAction}>Confirm</button>
          <button onClick={cancelAction}>Cancel</button>
        </div>
      ) : (
        <p>No pending sensitive actions</p>
      )}
    </div>
  );
};

export default SemiAutomatedTrigger;


/* 
import React from 'react';
import SemiAutomatedTrigger from './SemiAutomatedTrigger';

const ParallelAutomation: React.FC = () => {
  const sensitiveActions = ['purchase', 'deleteAccount'];

  const handleTrigger = (action: string) => {
    // Implement your logic to handle the triggered action
    console.log(`Triggered action: ${action}`);
  };

  return (
    <div>
      <SemiAutomatedTrigger
        onTrigger={handleTrigger}
        sensitiveActions={sensitiveActions}
      />
     
      </div>
    );
  };
  
  export default ParallelAutomation; 
*/