const express = require('express');
const app = express();
const port = 3000;

const { expensiveFunction } = require('./expensive_function');

app.get('/calc/:num', (req, res) => {
  const { num } = req.params;
  console.log(num);
  res.send('Done');
  expensiveFunction(Number(num));
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
