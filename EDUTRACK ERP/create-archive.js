const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Creating project archive...');

// Create a tar.gz archive of the project
try {
  execSync('tar -czf college-erp-system.tar.gz --exclude=node_modules --exclude=.git --exclude=dist --exclude=create-archive.js .', { stdio: 'inherit' });
  console.log('✅ Archive created: college-erp-system.tar.gz');
  console.log('📁 You can now download this file from your file system');
} catch (error) {
  console.error('❌ Error creating archive:', error.message);
  
  // Fallback: create a simple copy script
  console.log('Creating file list instead...');
  
  const files = [];
  
  function walkDir(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !['node_modules', '.git', 'dist'].includes(item)) {
        walkDir(fullPath);
      } else if (stat.isFile() && item !== 'create-archive.js') {
        files.push(fullPath);
      }
    });
  }
  
  walkDir('.');
  
  fs.writeFileSync('file-list.txt', files.join('\n'));
  console.log('📝 File list created: file-list.txt');
}