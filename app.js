const express = require('express');

const app = express();
const port = 3000;

const { expensiveFunctionWT, expensiveFunctionSync } = require('./expensive_function');

app.get('/wt/:some_number/:req_id', async (req, res) => {
	const { some_number, req_id } = req.params;

	res.send('job started in worker thread\n');
	const async_result = await expensiveFunctionWT(Number(some_number), req_id);
	console.dir(async_result);
});

app.get('/sync/:some_number/:req_id', async (req, res) => {
	const { some_number, req_id } = req.params;

	res.send('job started in main thread\n');
	const async_result = await expensiveFunctionSync(Number(some_number), req_id);
	console.dir(async_result);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
