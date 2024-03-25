const { query, body, param, validationResult, oneOf } = require("express-validator");
const resposne = require('../modules/response');
const { StatusCodes } = require("http-status-codes");
const responseMessage = require("../modules/responseMessage");

const validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(StatusCodes.BAD_REQUEST).send(resposne.Error(responseMessage.BAD_REQUEST));
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