const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'www');
const appShellFile = path.join(buildDir, 'app-shell.json');

const files = [];
function readDirSync(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      readDirSync(fullPath);
    } else {
      files.push(fullPath.replace(buildDir, ''));
    }
  });
}

if (fs.existsSync(buildDir)) {
  readDirSync(buildDir);
  fs.writeFileSync(appShellFile, JSON.stringify(files, null, 2));
  console.log(`App Shell file generated: ${appShellFile}`);
} else {
  console.error('Build directory not found. Run the build command first.');
}
