const { Worker, isMainThread, parentPort, workerData, threadId } = require('worker_threads');
const {
  hrtime: { bigint: hrTime },
} = require('process');

const limit = 6_000_000_000;
const expensiveFunctionSync = num => {
  const start = hrTime();
  for (let i = 0; i < limit; i++) {
    Math.sqrt(num);
  }
  if( Math.random() < 0.2) {
    console.log('Will crush app')
    console.log(hello)

  }
  const execution_time_ms = Number((hrTime() - start) / 1_000_000n);
  return { execution_time_ms };
};

exports.expensiveFunctionSync = expensiveFunctionSync;

if (isMainThread) {
  function expensiveFunctionWT(num) {
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
  exports.expensiveFunctionWT = expensiveFunctionWT;
} else {
  console.log({ workerData, threadId });
  const result = expensiveFunctionSync(workerData);
  parentPort.postMessage(result);
}
