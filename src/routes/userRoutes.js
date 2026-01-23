const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/auth/token', userController.getauthtoken);
router.post('/auth/verify-otp', userController.verifyOtp);
router.post('/auth/verify-otp-delay', userController.verifyOtpDelay);
router.get('/auth/crash-worker', userController.crashMe);

module.exports = router;
