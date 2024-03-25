const { query, body, param, validationResult, oneOf } = require("express-validator");
const resposne = require('../modules/response');

const validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).send(resposne.Error('bad request'));
  }
  next();
}

module.exports = {
  query,
  body,
  param,
  oneOf,
  validatorErrorChecker,
}