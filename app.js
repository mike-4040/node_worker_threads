const express = require('express');

const app = express();
const port = 3000;

const { expensiveFunctionWT, expensiveFunctionSync } = require('./expensive_function');

app.get('/wt/:some_number', async (req, res) => {
  const { some_number } = req.params;
  try {
    res.send('job started\n');
    const async_result = await expensiveFunctionWT(Number(some_number));
    console.dir(async_result);
  } catch (err) {
    console.error(err);
  }
});

app.get('/sync/:some_number', async (req, res) => {
  const { some_number } = req.params;
  try {
    res.send('job started\n');
    const async_result = await expensiveFunctionSync(Number(some_number));
    console.dir(async_result);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
