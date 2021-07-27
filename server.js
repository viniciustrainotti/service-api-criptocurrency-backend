const http = require('http');
const app = require('./app');

const port = process.env.PORT || 1000;
console.log('PORT', port);
const server = http.createServer(app);

server.listen(port);