const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--window-size=400,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  
  try {
    console.log('🧪 Testing Blood Pressure Entry Flow\n');
    
    // 1. Navigate to app
    console.log('1️⃣ Navigating to app...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Check if we need to login
    const isLoginPage = await page.$('input[type="email"]').catch(() => null);
    
    if (isLoginPage) {
      console.log('2️⃣ Logging in...');
      await page.type('input[type="email"]', 'john.doe@example.com');
      await page.type('input[type="password"]', 'password123');
      await page.click('button[type="submit"]');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    }
    
    // 3. Click the FAB button
    console.log('3️⃣ Clicking FAB button...');
    await page.waitForSelector('button[aria-label="Add entry"]', { timeout: 5000 });
    await page.click('button[aria-label="Add entry"]');
    await page.waitForTimeout(500);
    
    // 4. Select Blood Pressure
    console.log('4️⃣ Selecting Blood Pressure...');
    const bpButtons = await page.$$('button');
    for (const button of bpButtons) {
      const text = await button.evaluate(el => el.textContent);
      if (text && text.includes('Blood Pressure')) {
        await button.click();
        break;
      }
    }
    
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    // 5. Test time picker
    console.log('5️⃣ Testing time picker...');
    await page.waitForSelector('button[class*="rounded-full"][class*="border"]', { timeout: 5000 });
    
    // Click the time button
    const timeButton = await page.$('button[class*="rounded-full"][class*="border"]');
    if (timeButton) {
      await timeButton.click();
      console.log('   ✅ Time picker opened');
      await page.waitForTimeout(1000);
      
      // Check if modal opened
      const modal = await page.$('div[class*="fixed"][class*="inset-0"]');
      if (modal) {
        console.log('   ✅ Time picker modal displayed');
        
        // Click confirm
        const confirmButton = await page.$('button:has-text("Confirm")');
        if (confirmButton) {
          await confirmButton.click();
          console.log('   ✅ Time selected');
        }
      }
    }
    
    // 6. Fill BP values
    console.log('6️⃣ Entering blood pressure values...');
    const inputs = await page.$$('input[type="number"]');
    if (inputs.length >= 2) {
      await inputs[0].type('120'); // Systolic
      await inputs[1].type('80');  // Diastolic
      console.log('   ✅ First measurement: 120/80');
      
      if (inputs.length >= 4) {
        await inputs[2].type('118'); // Second systolic
        await inputs[3].type('78');  // Second diastolic
        console.log('   ✅ Second measurement: 118/78');
      }
    }
    
    // 7. Click Add button
    console.log('7️⃣ Clicking Add Blood Pressure button...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);
    
    const addButton = await page.$('button:has-text("Add Blood Pressure")');
    if (addButton) {
      const isDisabled = await addButton.evaluate(el => el.disabled);
      console.log(`   Button disabled: ${isDisabled}`);
      
      await addButton.click();
      console.log('   ✅ Clicked Add button');
      
      // Wait for navigation or success
      await page.waitForTimeout(2000);
      
      // Check if we're on success page
      const successText = await page.$('text=Your blood pressure has been added');
      if (successText) {
        console.log('   ✅ Success page displayed!');
      } else {
        // Check if we're still on the same page (error)
        const errorToast = await page.$('[role="alert"]');
        if (errorToast) {
          const errorText = await errorToast.evaluate(el => el.textContent);
          console.log('   ❌ Error:', errorText);
        }
      }
    } else {
      console.log('   ❌ Add button not found');
    }
    
    // 8. Check for duplicate hamburger menus
    console.log('\n8️⃣ Checking for hamburger menu issues...');
    const hamburgers = await page.$$('svg[class*="lucide-menu"]');
    console.log(`   Found ${hamburgers.length} hamburger menu(s)`);
    if (hamburgers.length > 1) {
      console.log('   ⚠️  Multiple hamburger menus detected!');
    } else {
      console.log('   ✅ No duplicate hamburger menus');
    }
    
    console.log('\n✅ Test completed!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
  }
  
  // Keep browser open for inspection
  console.log('\n📌 Browser will close in 10 seconds...');
  await page.waitForTimeout(10000);
  await browser.close();
})();