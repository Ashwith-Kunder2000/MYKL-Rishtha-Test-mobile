const { parentPort, workerData } = require('worker_threads');

function heavyOtpVerification(otp) {
  let a = 0;
  for (let i = 0; i < 1e9; i++) {
    a = i % 10;
  }
  return otp === '123456';
}

const result = heavyOtpVerification(workerData.otp);

parentPort.postMessage({
  success: result
});

