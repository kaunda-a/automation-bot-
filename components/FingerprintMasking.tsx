// components/FingerprintMasking.tsx
import React, { useEffect } from 'react';
import { Browser, Page } from 'puppeteer';
import * as CanvasBlocker from 'canvas-blocker';
import * as WebGLBlocker from 'webgl-blocker';
import * as WebRTCBlocker from 'webrtc-blocker';

interface FingerprintMaskingProps {
  browser: Browser;
  page: Page;
}

const FingerprintMasking: React.FC<FingerprintMaskingProps> = ({ browser, page }) => {
  useEffect(() => {
    const maskFingerprints = async () => {
      // Mask Canvas fingerprinting
      await page.evaluateOnNewDocument(() => {
        CanvasBlocker.block();
      });

      // Mask WebGL fingerprinting
      await page.evaluateOnNewDocument(() => {
        WebGLBlocker.block();
      });

      // Prevent WebRTC IP leakage
      await page.evaluateOnNewDocument(() => {
        WebRTCBlocker.block();
      });
    };

    maskFingerprints();
  }, [browser, page]);

  return null; // This component doesn't render any UI
};

export default FingerprintMasking;
