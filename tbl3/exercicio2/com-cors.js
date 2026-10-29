const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/usuarios', (req, res) => {
  res.json([{ id: 1, nome: 'Ana' }]);
});

app.listen(3000, () => {
  console.log('Servidor com CORS em http://localhost:3000');
});
