const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Blood Pressure Entry Page Compilation...\n');

// Check if the file exists
const bpEntryPath = path.join(__dirname, 'src/app/(main)/blood-pressure/entry/page.tsx');
if (!fs.existsSync(bpEntryPath)) {
  console.error('❌ Blood pressure entry page not found!');
  process.exit(1);
}

console.log('📁 File exists at:', bpEntryPath);

// Check imports
const content = fs.readFileSync(bpEntryPath, 'utf8');
const imports = content.match(/import .* from .*/g);

console.log('\n📦 Checking imports:');
imports.forEach(imp => {
  console.log('  ', imp);
  
  // Extract the import path
  const match = imp.match(/from ['"](.+)['"]/);
  if (match) {
    const importPath = match[1];
    
    // Check if it's a relative import starting with @/
    if (importPath.startsWith('@/')) {
      const resolvedPath = importPath.replace('@/', 'src/');
      const fullPath = path.join(__dirname, resolvedPath);
      
      // Check if file exists (try with .tsx, .ts, .js extensions)
      const extensions = ['.tsx', '.ts', '.js', ''];
      let found = false;
      
      for (const ext of extensions) {
        if (fs.existsSync(fullPath + ext) || fs.existsSync(fullPath + '/index' + ext)) {
          console.log('    ✅ Found:', resolvedPath + ext);
          found = true;
          break;
        }
      }
      
      if (!found) {
        console.log('    ❌ NOT FOUND:', resolvedPath);
      }
    }
  }
});

console.log('\n🔍 Checking component dependencies:');

// Check if all UI components exist
const uiComponents = ['button', 'input', 'label', 'time-picker', 'toast'];
uiComponents.forEach(comp => {
  const compPath = path.join(__dirname, 'src/components/ui', comp + '.tsx');
  if (fs.existsSync(compPath)) {
    console.log(`  ✅ ${comp}.tsx exists`);
  } else {
    console.log(`  ❌ ${comp}.tsx MISSING`);
  }
});

console.log('\n🏃 Attempting to run type check...');
try {
  // Run TypeScript compiler in check mode
  execSync('npx tsc --noEmit --skipLibCheck src/app/\\(main\\)/blood-pressure/entry/page.tsx', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  console.log('✅ TypeScript compilation successful!');
} catch (error) {
  console.log('❌ TypeScript compilation failed');
}

console.log('\n📋 Summary:');
console.log('- Blood pressure entry page exists');
console.log('- All imports have been checked');
console.log('- UI components verified');
console.log('\n💡 To test the full flow:');
console.log('1. Run: npm run dev');
console.log('2. Navigate to: http://localhost:3000');
console.log('3. Login and click the + button');
console.log('4. Select "Blood Pressure"');