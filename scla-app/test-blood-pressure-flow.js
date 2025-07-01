const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting blood pressure entry flow test...');
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for CI/CD
    defaultViewport: { width: 390, height: 844 } // iPhone 14 dimensions
  });
  const page = await browser.newPage();

  try {
    // Navigate to home page
    console.log('1. Navigating to app...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('button:has-text("Add")', { timeout: 10000 });
    console.log('✓ App loaded successfully');

    // Click the Add button (FAB)
    console.log('2. Clicking Add button...');
    await page.click('button:has-text("Add")');
    await page.waitForSelector('text="Blood Pressure"', { timeout: 5000 });
    console.log('✓ Add modal opened');

    // Click Blood Pressure option
    console.log('3. Selecting Blood Pressure...');
    await page.click('text="Blood Pressure"');
    await page.waitForSelector('h1:has-text("Blood Pressure")', { timeout: 5000 });
    console.log('✓ Blood pressure entry page loaded');

    // Fill in first measurement
    console.log('4. Entering first measurement...');
    await page.type('input[id="systolic1"]', '120');
    await page.type('input[id="diastolic1"]', '80');
    console.log('✓ First measurement entered');

    // Fill in second measurement (optional)
    console.log('5. Entering second measurement...');
    await page.type('input[id="systolic2"]', '118');
    await page.type('input[id="diastolic2"]', '78');
    console.log('✓ Second measurement entered');

    // Click Add button
    console.log('6. Submitting blood pressure readings...');
    await page.click('button:has-text("Add"):not(:has-text("Add Log"))');
    
    // Wait for success page
    await page.waitForSelector('text="Your blood pressure has been added."', { timeout: 5000 });
    console.log('✓ Blood pressure successfully added!');

    // Click Close to go back to dashboard
    console.log('7. Returning to dashboard...');
    await page.click('button:has-text("Close")');
    await page.waitForSelector('text="Good morning"', { timeout: 5000 });
    console.log('✓ Returned to dashboard');

    // Verify entry in diary
    console.log('8. Verifying entry in diary...');
    await page.click('text="Diary"');
    await page.waitForSelector('text="Blood Pressure"', { timeout: 5000 });
    console.log('✓ Blood pressure entry visible in diary!');

    console.log('\n✅ Blood pressure entry flow test completed successfully!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    // Take screenshot on failure
    await page.screenshot({ path: 'test-failure-bp.png' });
    console.log('Screenshot saved as test-failure-bp.png');
  } finally {
    await browser.close();
  }
})();