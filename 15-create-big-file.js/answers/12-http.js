const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  if (req.url === '/') {
    res.end('<h1>Welcome to the homepage!</h1>');
  } else if (req.url === '/about') {
    res.end('<h1>About Us</h1><p>This is a simple HTTP server example.</p>');
  } else if (req.url === '/contact') {
    res.end('<h1>Contact Us</h1><p>You can reach us at example@example.com</p>');
  } else {
    res.end('<h1>Page Not Found</h1><p>The requested URL was not found on this server.</p>');
  }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
