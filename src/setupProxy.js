const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

module.exports = function(app) {
  // This is a no-op function for webpack config.
  // We're using this file just to ensure the data directory exists at build time.
}; 