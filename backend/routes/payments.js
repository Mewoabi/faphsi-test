const express = require('express');
const {
  processPayment,
  initiatePay,
  directPay,
  paymentStatus,
  expirePay,
  userTrans,
  balance,
  payout,
  search,
} = require('../controllers/paymentsController');

const router = express.Router();

// POST /api/payments
router.post('/', processPayment);

// POST /api/payments/initiate
router.post('/initiate', initiatePay);

// POST /api/payments/direct
router.post('/direct', directPay);

// GET /api/payments/status/:transId
router.get('/status/:transId', paymentStatus);

// POST /api/payments/expire/:transId
router.post('/expire/:transId', expirePay);

// GET /api/payments/user/:userId
router.get('/user/:userId', userTrans);

// GET /api/payments/balance
router.get('/balance', balance);

// POST /api/payments/payout
router.post('/payout', payout);

// GET /api/payments/search
router.get('/search', search);

module.exports = router;
