// Server readiness check for Playwright global setup
const { chromium } = require('playwright');

async function checkServerReady() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Wait for server endpoint to respond successfully
  await page.goto('http://localhost:3000/health');
  
  // Verify server is responding with 200 status
  const status = page.status();
  if (status !== 200) {
    throw new Error(`Server health check failed with status ${status}`);
  }

  await page.close();
  await browser.close();
}

// Wait up to 60 seconds for server to be ready
async function waitForServer() {
  const startTime = Date.now();
  while (Date.now() - startTime < 60000) {
    try {
      await checkServerReady();
      return;
    } catch (e) {
      console.log('Server not ready yet, retrying...');
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  throw new Error('Server failed to start within 60 seconds');
}

module.exports = { waitForServer };