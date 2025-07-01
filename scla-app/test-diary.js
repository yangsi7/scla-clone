const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport to iPhone size
  await page.setViewport({ width: 390, height: 844 });
  
  try {
    // Navigate to the app
    await page.goto('http://localhost:3000');
    
    // Wait for app to load
    await page.waitForSelector('button:has-text("Get Started")', { timeout: 5000 });
    
    // Click Get Started
    await page.click('button:has-text("Get Started")');
    
    // Login
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'john.doe@example.com');
    await page.type('input[type="password"]', 'password123');
    await page.click('button:has-text("Sign In")');
    
    // Wait for dashboard
    await page.waitForSelector('text=Good', { timeout: 5000 });
    
    // Navigate to Diary tab
    await page.click('a[href="/diary"]');
    
    // Wait for diary page
    await page.waitForSelector('text=Diary');
    
    console.log('✅ Navigated to Diary page');
    
    // Test calendar day selection
    const days = await page.$$('.grid.grid-cols-7 button');
    console.log(`Found ${days.length} calendar days`);
    
    if (days.length > 10) {
      // Click on a day
      await days[10].click();
      console.log('✅ Clicked on a calendar day');
      
      // Check if selection indicator appears
      await page.waitForSelector('.bg-\\[rgb\\(var\\(--scla-primary-blue\\)\\)\\]', { timeout: 2000 });
      console.log('✅ Day selection indicator visible');
    }
    
    // Check empty state or entries
    const hasEmptyState = await page.$('text=Welcome to your Diary');
    const hasEntries = await page.$('text=SYMPTOM');
    
    if (hasEmptyState) {
      console.log('✅ Empty state displayed correctly');
    } else if (hasEntries) {
      console.log('✅ Entries displayed correctly');
      
      // Try clicking an entry
      const entry = await page.$('button:has-text("SYMPTOM")');
      if (entry) {
        await entry.click();
        await page.waitForSelector('text=Today', { timeout: 3000 });
        console.log('✅ Navigated to entry detail view');
      }
    }
    
    console.log('✅ All diary tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  // Keep browser open for manual inspection
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  await browser.close();
})();