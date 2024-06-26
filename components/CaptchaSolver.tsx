// components/CaptchaSolver.tsx
import React, { useState } from 'react';
import { solveCaptcha } from '../utils/captchaSolver';

interface CaptchaSolverProps {
  onCaptchaSolved: (solution: string) => void;
}

const CaptchaSolver: React.FC<CaptchaSolverProps> = ({ onCaptchaSolved }) => {
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCaptchaEncountered = async (captchaImageUrl: string) => {
    setIsLoading(true);
    setCaptchaImage(captchaImageUrl);

    try {
      const solution = await solveCaptcha(captchaImageUrl);
      onCaptchaSolved(solution);
    } catch (error) {
      console.error('Error solving CAPTCHA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {captchaImage && (
        <div>
          <img src={captchaImage} alt="CAPTCHA" />
          {isLoading ? <p>Solving CAPTCHA...</p> : null}
        </div>
      )}
    </div>
  );
};

export default CaptchaSolver;
