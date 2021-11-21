const express = require('express');

const app = express();
const port = 3000;

const { expensiveFunction } = require('./expensive_function');

app.get('/:some_number', async (req, res) => {
  const { some_number } = req.params;
  try {
    console.log({ some_number });
    res.send('job started\n');
    const async_result = await expensiveFunction(Number(some_number));
    console.dir(async_result);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
