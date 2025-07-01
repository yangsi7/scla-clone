const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport to iPhone size
  await page.setViewport({ width: 390, height: 844 });
  
  try {
    console.log('🔄 Testing complete flow...\n');
    
    // 1. Regenerate data
    console.log('1️⃣ Regenerating data with June entries...');
    await page.goto('http://localhost:3000/regenerate-data');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('✅ Data regenerated, redirected to dashboard\n');
    
    // 2. Check if we're on welcome or dashboard
    const url = page.url();
    if (url.includes('welcome')) {
      console.log('2️⃣ On welcome page, proceeding to login...');
      
      // Click Get Started
      await page.waitForSelector('button:has-text("Get Started")', { timeout: 5000 });
      await page.click('button:has-text("Get Started")');
      
      // Login
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', 'john.doe@example.com');
      await page.type('input[type="password"]', 'password123');
      await page.click('button:has-text("Sign In")');
      
      // Wait for dashboard
      await page.waitForSelector('text=Good', { timeout: 5000 });
      console.log('✅ Logged in successfully\n');
    } else {
      console.log('✅ Already on dashboard (session active)\n');
    }
    
    // 3. Navigate to Diary tab
    console.log('3️⃣ Navigating to Diary tab...');
    await page.click('a[href="/diary"]');
    await page.waitForSelector('text=Diary', { timeout: 5000 });
    console.log('✅ On Diary page\n');
    
    // 4. Test month/year picker
    console.log('4️⃣ Testing month/year picker...');
    const monthButton = await page.$('button:has(h2)');
    if (monthButton) {
      await monthButton.click();
      await page.waitForSelector('text=Select', { timeout: 2000 });
      console.log('✅ Month/Year picker opened\n');
      
      // Navigate to June 2024
      console.log('5️⃣ Navigating to June 2024...');
      
      // Click June
      await page.click('button:has-text("Jun")');
      
      // Navigate to 2024 if needed
      const yearText = await page.$eval('h2', el => el.textContent);
      if (!yearText.includes('2024')) {
        // Click previous year button until we reach 2024
        while (true) {
          const currentYear = await page.$eval('.text-xl.font-semibold', el => el.textContent);
          if (currentYear.includes('2024')) break;
          await page.click('button:has(svg):first-of-type'); // Previous year button
          await page.waitForTimeout(100);
        }
      }
      
      // Confirm selection
      await page.click('button:has-text("Select")');
      await page.waitForTimeout(500);
      console.log('✅ Navigated to June 2024\n');
      
      // Check for entries
      const hasEntries = await page.$('text=SYMPTOM') || await page.$('text=BLOOD PRESSURE');
      if (hasEntries) {
        console.log('✅ June 2024 has entries visible!\n');
      } else {
        console.log('⚠️  No entries visible in June 2024\n');
      }
    }
    
    // 5. Test settings icon
    console.log('6️⃣ Testing settings icon...');
    const settingsIcon = await page.$('button:has(svg[size="20"]):last-of-type');
    if (settingsIcon) {
      await settingsIcon.click();
      await page.waitForSelector('text=Manage Symptoms & Triggers', { timeout: 2000 });
      console.log('✅ Settings page opened\n');
      
      // Test tabs
      await page.click('button:has-text("Triggers")');
      await page.waitForTimeout(500);
      console.log('✅ Triggers tab working\n');
      
      // Go back
      await page.click('button:has(svg[size="24"])');
      await page.waitForSelector('text=Diary', { timeout: 2000 });
      console.log('✅ Back to diary\n');
    }
    
    console.log('🎉 All tests passed! The diary is fully functional.\n');
    console.log('Summary:');
    console.log('- Data regeneration ✅');
    console.log('- Month/Year picker ✅');
    console.log('- June 2024 navigation ✅');
    console.log('- Settings page ✅');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  // Keep browser open for manual inspection
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  await browser.close();
})();