const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
  const [,, inputHtml, outputPdf] = process.argv;
  if (!inputHtml || !outputPdf) {
    console.error('Usage: node generate-pdf.js <input-html> <output-pdf>');
    process.exit(2);
  }

  const url = `http://127.0.0.1:8080/${inputHtml.replace(/^\/+/, '')}`;

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPdf, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
  await browser.close();
  console.log('PDF generated:', outputPdf);
}

main().catch(err => { console.error(err); process.exit(1); });
