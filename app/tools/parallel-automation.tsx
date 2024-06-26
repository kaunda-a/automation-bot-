
import React from 'react';
import ProxyRotator from '@/components/ProxyRotator';
import UserAgentRotator from '@/components/UserAgentRotator';
import ParallelAutomation from '@/components/ParallelAutomation';

const ParallelAutomationPage = async () => {
  const proxyPool = [
    "123.45.67.89:8080",
    "98.76.54.32:3128",
    // Add more proxy addresses here
  ];
  const useResidentialProxies = true;

  const browser = await import('puppeteer').then(puppeteer => 
    puppeteer.launch()
  );

  return (
    <UserAgentRotator>
       <ProxyRotator
         proxyPool={proxyPool}
         useResidentialProxies={useResidentialProxies}
       >
         <ParallelAutomation browser={browser} />
       </ProxyRotator>
    </UserAgentRotator>
  );
};

export default ParallelAutomationPage;

/*
  return (
    <UserAgentRotator>
      <ProxyRotator
        proxyPool={proxyPool}
        useResidentialProxies={useResidentialProxies}
      >
        {(browser) => (
          <ParallelAutomation browser={browser}>
            {({ page }) => (
              <>
                <FingerprintMasking browser={browser} page={page} />
                <BehavioralClustering browser={browser} page={page} />
              </>
            )}
          </ParallelAutomation>
        )}
      </ProxyRotator>
    </UserAgentRotator>
  );
};
*/