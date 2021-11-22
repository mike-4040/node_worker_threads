const { Worker, isMainThread, parentPort, workerData, threadId } = require('worker_threads');
const {
	hrtime: { bigint: hrTime },
} = require('process');

const limit = 5_000_000_000;
const expensiveFunctionSync = (num, req_id) => {
	const start = hrTime();
	for (let i = 0; i < limit; i++) {
		Math.sqrt(num);
	}
	if (req_id === '4') {
    process.exit(1);
	}
	const execution_time_ms = Number((hrTime() - start) / 1_000_000n);
	return { execution_time_ms, req_id };
};

exports.expensiveFunctionSync = expensiveFunctionSync;

if (isMainThread) {
	function expensiveFunctionWT(num, req_id) {
		return new Promise((resolve, reject) => {
			const worker = new Worker(__filename, {
				workerData: { num, req_id },
			});
			worker.on('message', async (msg) => {
				resolve(msg);
				worker.terminate();
			});
			worker.on('error', reject);
			worker.on('exit', (code) => {
				if (code !== 0) {
					reject(new Error(`Worker stopped with exit code ${code}`));
				}
			});
		});
	}
	exports.expensiveFunctionWT = expensiveFunctionWT;
} else {
  const { num, req_id } = workerData;
	console.log({ num, req_id, threadId });
	const result = expensiveFunctionSync(num, req_id);
	parentPort.postMessage(result);
}
