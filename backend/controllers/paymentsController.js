const fapshi = require('../services/fapshi');

exports.processPayment = async (req, res) => {
  const { productId, amount } = req.body;

  if (!productId || !amount) {
    return res.status(400).json({ error: 'Product ID and amount are required' });
  }

  // Simulate payment processing
  console.log(`Processing payment for product ${productId} with amount $${amount}`);
  res.status(200).json({ message: 'Payment processed successfully' });
};

exports.initiatePay = async (req, res) => {
    console.log('endpoint hit')
  try {
    const result = await fapshi.initiatePay(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.directPay = async (req, res) => {
  try {
    const result = await fapshi.directPay(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.paymentStatus = async (req, res) => {
  try {
    const result = await fapshi.paymentStatus(req.params.transId);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.expirePay = async (req, res) => {
  try {
    const result = await fapshi.expirePay(req.params.transId);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.userTrans = async (req, res) => {
  try {
    const result = await fapshi.userTrans(req.params.userId);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.balance = async (req, res) => {
  try {
    const result = await fapshi.balance();
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.payout = async (req, res) => {
  try {
    const result = await fapshi.payout(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.search = async (req, res) => {
  try {
    const result = await fapshi.search(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
