const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
}

const limit = 10_000_000_000;
const some_number = 999_999.999;
const expensiveFunction = (num) => {
  console.time('1');
  for (let i = 0; i < limit; i++) {
    const x = Math.sqrt(num * some_number);
  }
  console.timeEnd('1');
};

module.exports.expensiveFunction = expensiveFunction;
