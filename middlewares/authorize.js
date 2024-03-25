const jwt = require('./jwt');
const { StatusCodes } = require('http-status-codes');
const response = require('../modules/response');
const ResponseMessage = require('../modules/responseMessage')

const authorization = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).send(response.Error(ResponseMessage.EMPTY_TOKEN));
  }

  const token = authorization;
  const user = await jwt.verify({ token });

  // 유효기간 만료
  if (user === jwt.TOKEN_EXPIRED)
    return res.status(StatusCodes.UNAUTHORIZED).send(response.Error(ResponseMessage.EXPIRED_TOKEN));
  // 유효하지 않는 토큰
  if (user === jwt.TOKEN_INVALID)
    return res.status(StatusCodes.UNAUTHORIZED).send(response.Error(ResponseMessage.INVALID_TOKEN));
  if (user.id === undefined)
    return res.status(StatusCodes.UNAUTHORIZED).send(response.Error(ResponseMessage.INVALID_TOKEN));

  req.jwt = user

  next();
}

/**
 *
 * @param {Array} userTypes
 * @returns
 */
const checkUserType = (userTypes) => {
  const allowUserTypes = userTypes;

  return (req, res, next) => {
    const tokenInfo = req.jwt;
    console.log(allowUserTypes, tokenInfo);
    if (!allowUserTypes.includes(tokenInfo.type)) {
      return res.status(401).send(response.Error('unauthorized'));
    }

    next();
  }
}

module.exports = {
  authorization,
  checkUserType,
}