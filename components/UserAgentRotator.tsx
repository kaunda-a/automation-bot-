
"use client";

import React, { useState, useEffect } from 'react';
import { Browser, launch } from 'puppeteer';
import axios from 'axios';

interface UserAgentRotatorProps {
  children: React.ReactNode;
}

const UserAgentRotator: React.FC<UserAgentRotatorProps> = ({ children }) => {
  const [browser, setBrowser] = useState<Browser | null>(null);
  const [userAgents, setUserAgents] = useState<string[]>([]);
/*
useEffect hook (first one): This hook is responsible for fetching a list of user agents from the https://api.whatismybrowser.com/api/v2/user-agents/random API. You'll need to replace 'YOUR_API_KEY' with your actual API key from the service.
useEffect hook (second one): This hook is responsible for initializing the browser instance with a randomly selected user agent from the userAgents array.
The component renders the children components and passes the browser instance as a prop.
*/
  useEffect(() => {
    const fetchUserAgents = async () => {
      try {
        const response = await axios.get('https://api.whatismybrowser.com/api/v2/user-agents/random?key=YOUR_API_KEY&num=20');
        setUserAgents(response.data.user_agents);
      } catch (error) {
        console.error('Error fetching user agents:', error);
      }
    };

    fetchUserAgents();
  }, []);

  useEffect(() => {
    const initBrowser = async () => {
      const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

      const newBrowser = await launch({
        args: [`--user-agent=${randomUserAgent}`],
        headless: false, // Set to true to run in headless mode
      });

      setBrowser(newBrowser);
    };

    if (userAgents.length > 0) {
      initBrowser();
    }
  }, [userAgents]);

  return (
    <>
      {browser && React.cloneElement(children as React.ReactElement, { browser })}
    </>
  );
};

export default UserAgentRotator;


/*
UserAgentRotatorProps interface: Defines the props for the component, which includes children (the child components to be rendered with the user agent-enabled browser).

UserAgentRotator component:

browser state: Stores the Puppeteer browser instance.
userAgents state: Stores an array of user agent strings.
useEffect hook (first one): This hook is responsible for fetching a list of user agents from the https://api.whatismybrowser.com/api/v2/user-agents/random API. You'll need to replace 'YOUR_API_KEY' with your actual API key from the service.
useEffect hook (second one): This hook is responsible for initializing the browser instance with a randomly selected user agent from the userAgents array.
The component renders the children components and passes the browser instance as a prop.

*/