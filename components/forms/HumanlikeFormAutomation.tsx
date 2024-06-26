// HumanlikeFormAutomation.tsx
import React, { useState, useEffect } from 'react';
import FormAutomation from '../FormAutomation';

const randomDelay = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const HumanlikeFormAutomation = () => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleAutomation = async () => {
      setIsRunning(true);
      // Simulate human-like delays
      await new Promise(resolve => setTimeout(resolve, randomDelay(1000, 3000)));
      // You can trigger form submission here or handle it inside FormAutomation
      setIsRunning(false);
    };

    if (isRunning) {
      handleAutomation();
    }
  }, [isRunning]);

  const startAutomation = () => {
    setIsRunning(true);
  };

  return (
    <div>
      <button onClick={startAutomation} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start Human-like Automation'}
      </button>
      <FormAutomation />
    </div>
  );
};

export default HumanlikeFormAutomation;