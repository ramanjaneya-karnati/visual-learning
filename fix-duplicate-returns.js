const fs = require('fs');

// Fix duplicate return statements
const files = [
  'server/routes/admin.ts',
  'server/routes/concepts.ts'
];

files.forEach(filePath => {
  console.log(`Fixing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix duplicate return statements
  content = content.replace(/return return /g, 'return ');
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${filePath}`);
});

console.log('🎉 All duplicate return statements fixed!'); 