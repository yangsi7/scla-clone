const puppeteer = require('puppeteer');

async function testBPEntry() {
  console.log('Starting Blood Pressure Entry test...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    slowMo: 50,
    defaultViewport: { width: 393, height: 852 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the app
    console.log('1. Navigating to app...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Check if we need to log in
    const url = page.url();
    console.log('Current URL:', url);
    
    if (url.includes('welcome')) {
      console.log('2. Logging in...');
      await page.click('button:has-text("Get Started")');
      await page.waitForNavigation();
      
      // Try login
      await page.type('input[type="email"]', 'john.doe@example.com');
      await page.type('input[type="password"]', 'password123');
      await page.click('button:has-text("Sign In")');
      await page.waitForNavigation();
    }
    
    // Wait for dashboard to load
    console.log('3. Waiting for dashboard...');
    await page.waitForSelector('button[aria-label="Add"], .w-14.h-14', { timeout: 5000 });
    
    // Click the + button
    console.log('4. Clicking + button...');
    await page.click('.w-14.h-14');
    
    // Wait for modal and click "Add Blood Pressure"
    console.log('5. Waiting for modal...');
    await page.waitForSelector('button:has-text("Add Blood Pressure")', { timeout: 5000 });
    await page.click('button:has-text("Add Blood Pressure")');
    
    // Wait for blood pressure entry page
    console.log('6. Waiting for BP entry page...');
    await page.waitForSelector('h1:has-text("Blood Pressure")', { timeout: 5000 });
    
    // Check if time picker is present
    console.log('7. Checking time picker...');
    const timePicker = await page.$('.flex-1.p-4.bg-gray-50.rounded-lg');
    if (timePicker) {
      console.log('✓ Time picker found');
      
      // Click time picker
      await timePicker.click();
      console.log('✓ Time picker clicked - modal should open');
      
      // Wait a bit to see if modal opens
      await page.waitForTimeout(1000);
      
      // Check if modal is visible
      const modal = await page.$('.absolute.top-full.mt-2.left-0.right-0.bg-white.rounded-lg.shadow-lg');
      if (modal) {
        console.log('✓ Time picker modal opened successfully');
        
        // Click Set Time button
        await page.click('button:has-text("Set Time")');
        console.log('✓ Time set');
      } else {
        console.log('✗ Time picker modal did not open');
      }
    } else {
      console.log('✗ Time picker not found');
    }
    
    // Fill in blood pressure values
    console.log('8. Filling BP values...');
    await page.type('input[placeholder="Systolic"]', '120');
    await page.type('input[placeholder="Diastolic"]', '80');
    
    // Click Add button
    console.log('9. Clicking Add button...');
    const addButton = await page.$('button:has-text("Add")');
    if (addButton) {
      const isDisabled = await page.evaluate(btn => btn.disabled, addButton);
      console.log('Add button disabled?', isDisabled);
      
      await addButton.click();
      console.log('✓ Add button clicked');
      
      // Wait for navigation or success
      await page.waitForTimeout(2000);
      
      const currentUrl = page.url();
      console.log('Final URL:', currentUrl);
      
      if (currentUrl.includes('success')) {
        console.log('✓ Successfully saved blood pressure!');
      } else {
        console.log('✗ Did not navigate to success page');
      }
    } else {
      console.log('✗ Add button not found');
    }
    
    // Check for any error messages
    const errors = await page.$$eval('.text-destructive, .text-red-500', els => els.map(el => el.textContent));
    if (errors.length > 0) {
      console.log('Errors found:', errors);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
    
    // Take screenshot on error
    await page.screenshot({ path: 'bp-error.png' });
    console.log('Screenshot saved as bp-error.png');
  }
  
  console.log('\nTest complete. Browser will close in 5 seconds...');
  await page.waitForTimeout(5000);
  await browser.close();
}

testBPEntry().catch(console.error);