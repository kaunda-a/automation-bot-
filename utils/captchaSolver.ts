// utils/captchaSolver.ts
import axios from 'axios';

/*
This solveCaptcha function uses the 2Captcha service to solve CAPTCHAs. 
You'll need to replace 'your_2captcha_api_key' with your actual 2Captcha API key. The function sends the CAPTCHA image to the 2Captcha service, waits for the solution, and returns the solution when it's available
*/
const CAPTCHA_SOLVER_API_KEY = 'your_2captcha_api_key';

export async function solveCaptcha(captchaImageUrl: string): Promise<string> {
  const formData = new FormData();
  formData.append('method', 'base64');
  formData.append('key', CAPTCHA_SOLVER_API_KEY);

  const captchaImageResponse = await axios.get(captchaImageUrl, { responseType: 'arraybuffer' });
  const captchaImageBase64 = Buffer.from(captchaImageResponse.data, 'binary').toString('base64');
  formData.append('body', captchaImageBase64);

  const response = await axios.post('https://2captcha.com/in.php', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  const captchaId = response.data.split('|')[1];

  while (true) {
    const resultResponse = await axios.get(`https://2captcha.com/res.php?key=${CAPTCHA_SOLVER_API_KEY}&action=get&id=${captchaId}`);
    const result = resultResponse.data.split('|');

    if (result[0] === 'OK') {
      return result[1];
    } else if (result[0] === 'CAPCHA_NOT_READY') {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    } else {
      throw new Error(`Error solving CAPTCHA: ${result[1]}`);
    }
  }
}


