import puppeteer from 'puppeteer-core';

export const automateFormSubmission = async (formUrl: string, formData: { name: string; value: string }[]) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(formUrl);
  for (const field of formData) {
    await page.type(`input[name="${field.name}"]`, field.value);
  }

  const result = await page.evaluate(() => {
    const form = document.querySelector('form');
    if (form) {
      form.submit();
      return 'Form submitted successfully';
    } else {
      return 'Form not found';
    }
  });

  await browser.close();
  return result;
};
