const http = require('http');
const fs = require('fs');
const path = require('path');

const porta = Number(process.argv[2] || 5500);
const arquivo = path.join(__dirname, 'exercicio4', 'index.html');

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(fs.readFileSync(arquivo));
}).listen(porta, () => {
  console.log(`Frontend rodando em http://localhost:${porta}`);
});
