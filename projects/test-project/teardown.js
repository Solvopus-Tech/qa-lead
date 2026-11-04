// Cleanup after Playwright tests
async function stopServer() {
  // Execute dev server stop script
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec('pnpm run dev:stop', (error, stdout, stderr) => {
      if (error) {
        console.error(`Server stop failed: ${error.message}`);
        return reject(error);
      }
      console.log('Server stopped successfully');
      resolve();
    });
  });
}

module.exports = { stopServer };