const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express'); // Add this line

const app = express(); // Add this line

// Serve static files from the "patterns" directory

const patternsDir = process.argv[2] || path.join(__dirname, 'patterns');

console.log(`Serving patterns from ${patternsDir}`);

app.use(express.static(patternsDir)); // Add this line

app.get('/', (req, res) => {
  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');

  // Read the index.html file
  const indexPath = path.join(__dirname, 'index.html');
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      // If there's an error reading the file, return a 500 status code
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      // If the file is read successfully, return the contents as the response
      res.statusCode = 200;
      res.end(data);
    }
  });
});

app.get('/api/patterns', (req, res) => {
  fs.readdir(patternsDir, (err, files) => {
    if (err) {
      res.status(500).send('Unable to read patterns directory');
    } else {
      // Generate HTML string for the options
      const optionsHtml = files.map(file => `<option value="${file}">${file}</option>`).join('');
      res.send(optionsHtml);
    }
  });
});
// Create an HTTP server and pass the Express app as the request handler
const server = http.createServer(app); // Modify this line

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});