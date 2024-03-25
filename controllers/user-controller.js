const { StatusCodes } = require('http-status-codes');
const jwt = require('../middlewares/jwt');
const response = require('../modules/response');

const login = async (req, res, next) => {
  const id = req.body.id;
  const type = req.body.type;

  const token = await jwt.sign({
    id,
    type,
  });
  return res.status(StatusCodes.OK).json(response.Success(token.token));
}

const me = (req, res, next) => {
  return res.status(StatusCodes.OK).json(response.Success(req.jwt));
}

module.exports = {
  login,
  me,
}