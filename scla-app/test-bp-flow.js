// Test blood pressure entry flow
console.log('Blood Pressure Entry Flow Test\n');

const testBPFlow = async () => {
  try {
    // 1. Check if server is running
    const response = await fetch('http://localhost:3000');
    if (!response.ok) {
      throw new Error('Server not running on port 3000');
    }
    console.log('✅ Server is running\n');

    // 2. Test BP entry page exists
    const bpPage = await fetch('http://localhost:3000/blood-pressure/entry');
    console.log('📍 Blood Pressure Entry Page Status:', bpPage.status);
    
    // 3. Instructions for manual testing
    console.log('\n📋 Manual Testing Steps:\n');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Login with: john.doe@example.com / password123');
    console.log('3. Click the blue "+" button (FAB) at bottom right');
    console.log('4. Select "Blood Pressure" from the modal');
    console.log('5. On the BP entry page:');
    console.log('   - Date should show "Today"');
    console.log('   - Click time to open time picker');
    console.log('   - Enter first measurement (e.g., 120/80)');
    console.log('   - Optionally enter second measurement');
    console.log('   - Click "Add Blood Pressure"');
    console.log('6. Success page should appear');
    console.log('7. Click "Close" to return to dashboard');
    console.log('8. Go to Diary tab to see the new entry\n');
    
    console.log('🔍 Expected Features:');
    console.log('- Time picker modal with AM/PM toggle');
    console.log('- Validation: Systolic 70-250, Diastolic 40-150');
    console.log('- Average calculation if both measurements entered');
    console.log('- Success illustration after saving');
    console.log('- Entry appears in diary with timestamp\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testBPFlow();