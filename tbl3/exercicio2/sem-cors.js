const express = require('express');

const app = express();

app.get('/usuarios', (req, res) => {
  res.json([{ id: 1, nome: 'Ana' }]);
});

app.listen(3000, () => {
  console.log('Servidor sem CORS em http://localhost:3000');
});
