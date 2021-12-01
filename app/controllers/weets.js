const logger = require('../logger');
const weetsService = require('../services/weets');

const createWeet = async (req, res, next) => {
  const userData = req.body;
  try {
    const weet = await weetsService.saveWeet(userData);
    return res.status(201).send(weet);
  } catch (error) {
    logger.error(error.message);
    return next(error);
  }
};

module.exports = { createWeet };
