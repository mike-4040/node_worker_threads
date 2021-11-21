const { Worker, isMainThread, parentPort, workerData, threadId } = require('worker_threads');
const {
  hrtime: { bigint: hrTime },
} = require('process');

const limit = 3_000_000_000;
const expensiveFunctionExe = num => {
  const start = hrTime();
  for (let i = 0; i < limit; i++) {
    Math.sqrt(num);
  }
  const execution_time_ms = Number((hrTime() - start) / 1_000_000n);
  return { execution_time_ms };
};

if (isMainThread) {
  function expensiveFunction(num) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: num,
      });
      worker.on('message', async msg => {
        resolve(msg);
        worker.terminate();
      });
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }
  exports.expensiveFunction = expensiveFunction;
} else {
  console.log({ workerData, threadId });
  const result = expensiveFunctionExe(workerData);
  parentPort.postMessage(result);
}
