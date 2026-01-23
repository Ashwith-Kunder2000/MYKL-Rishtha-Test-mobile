const { parseRequestBody, respondWithSuccess, respondWithError } = require('./utils');


exports.getauthtoken = async (req, res) => {
    let scheduledVisit=false;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return respondWithError(req, res, 400, ["Authorization header is missing."]);
    }
    try {
            console.log(`Request handled by worker PID: ${process.pid}`);
        const token="vxfxr64r65rchhvut678yyu87656545vght";
        const account = {
            id: 1,
            username: "testuser",
            email: "ashwith@gmail.com",
            name: "Ashwith",
            role: "admin"
        };
                
        return respondWithSuccess(req, res, { 
            message: 'Log in successful', 
            token: token, 
            userdetails: account,
            workerId: process.pid
        });
    } catch (err) {
        console.error(err);
        return respondWithError(req, res, 500, ["Internal Server Error"]);
    }
};

exports.verifyOtpDelay = async (req, res) => {
    let scheduledVisit=false;
    const otp = req.body.otp;
    if (!otp) {
        return respondWithError(req, res, 400, ["OTP is missing."]);
    }
    try {

            console.log(`Request handled by worker PID: ${process.pid}`);
            let a=0;
            for(let i=0;i<10000000000;i++){
                 a=9;//dummy loop to simulate delay to get worker difference
                }
        return respondWithSuccess(req, res, { 
            message: 'Otp verified successfully', 
            OTP: otp,
            workerId: process.pid
        });
    } catch (err) {
        console.error(err);
        return respondWithError(req, res, 500, ["Internal Server Error"]);
    }
};

const { Worker } = require('worker_threads');
const path = require('path');

exports.verifyOtp = async (req, res) => {
  const otp = req.body.otp;
  if (!otp) {
    return respondWithError(req, res, 400, ["OTP is missing."]);
  }

  console.log(`Request accepted by worker PID: ${process.pid}`);

  const worker = new Worker(
    path.resolve(__dirname, '../workers/otpWorker.js'),
    { workerData: { otp } }
  );

  worker.on('message', (result) => {
    return respondWithSuccess(req, res, {
      message: 'Otp verified successfully',
      result,
      servedByWorker: process.pid,
      thread: 'worker_thread'
    });
  });

  worker.on('error', (err) => {
    console.error(err);
    return respondWithError(req, res, 500, ["OTP verification failed"]);
  });
};

exports.crashMe = (req, res) => {
  console.log(`Crashing worker ${process.pid}`);
  process.exit(1);
};
//TESTING