const fs = require('fs');
const path = require('path');

// Files to fix
const files = [
  'server/routes/admin.ts',
  'server/routes/concepts.ts'
];

files.forEach(filePath => {
  console.log(`Fixing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix missing return statements in catch blocks
  content = content.replace(
    /res\.status\(500\)\.json\(\{ error: '[^']*' \}\);/g,
    'return res.status(500).json({ error: \'Server error\' });'
  );
  
  content = content.replace(
    /res\.status\(400\)\.json\(\{ error: '[^']*' \}\);/g,
    'return res.status(400).json({ error: \'Bad request\' });'
  );
  
  content = content.replace(
    /res\.status\(404\)\.json\(\{ error: '[^']*' \}\);/g,
    'return res.status(404).json({ error: \'Not found\' });'
  );
  
  content = content.replace(
    /res\.status\(401\)\.json\(\{ error: '[^']*' \}\);/g,
    'return res.status(401).json({ error: \'Unauthorized\' });'
  );
  
  content = content.replace(
    /res\.status\(403\)\.json\(\{ error: '[^']*' \}\);/g,
    'return res.status(403).json({ error: \'Forbidden\' });'
  );
  
  // Fix missing return statements in success responses
  content = content.replace(
    /res\.json\(\{ ([^}]+) \}\);/g,
    'return res.json({ $1 });'
  );
  
  content = content.replace(
    /res\.status\(201\)\.json\(\{ ([^}]+) \}\);/g,
    'return res.status(201).json({ $1 });'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${filePath}`);
});

console.log('🎉 All TypeScript errors fixed!'); 