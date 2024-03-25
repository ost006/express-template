const { query, body, param, validationResult } = require("express-validator");

exports.query = query
exports.body = body
exports.param = param
exports.validatorErrorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const message = `invalid ${errors.errors[0].location} ${errors.errors[0].path} value`;
    return res.status(400).send({error: message});
  }
  next()
}