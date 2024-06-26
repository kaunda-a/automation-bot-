// components/ProxyRotator.tsx
"use client";

//use conditional importing ti ensure that server-side-side
let net;
if (typeof window === 'undefined') {
  net = require('net');
}
/*
// or dynamic imports
import dynamic from 'next/dynamic';
const net = dynamic(() => import('net') { ssr: false });
*/
import React, { useState, useEffect } from 'react';
import { Browser, launch } from 'puppeteer';

interface ProxyRotatorProps {
  proxyPool: string[];
  useResidentialProxies: boolean;
  children: React.ReactNode;
}

const ProxyRotator: React.FC<ProxyRotatorProps> = ({
  proxyPool,
  useResidentialProxies,
  children,
}) => {
  const [browser, setBrowser] = useState<Browser | null>(null);

  useEffect(() => {
    const initBrowser = async () => {
      const proxy = proxyPool[Math.floor(Math.random() * proxyPool.length)];
      const proxyUrl = `http://${proxy}`;

      const args = useResidentialProxies
        ? [`--proxy-server=${proxyUrl}`, '--proxy-bypass-list=<-loopback>']
        : [`--proxy-server=${proxyUrl}`];

      const newBrowser = await launch({
        args,
        headless: false, // Set to true to run in headless mode
      });

      setBrowser(newBrowser);
    };

    initBrowser();
  }, [proxyPool, useResidentialProxies]);

  return (
    <>
      {browser && React.cloneElement(children as React.ReactElement, { browser })}
    </>
  );
};

export default ProxyRotator;
