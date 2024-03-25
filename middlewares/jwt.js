// const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

const JwtSecretKey = process.env.JWT_SECRET_KEY;
const JwtOption = {
  option: {
    algorithm: process.env.JWT_OPTION_ALGORITHM,
    expiresIn: process.env.JWT_OPTION_EXPIRESIN,
    issuer: process.env.JWT_OPTION_ISSURE,
  }
}

// type은 사용자 유형 sys | oper | user
module.exports = {
  TOKEN_EXPIRED,
  TOKEN_INVALID,
  sign: async ({ id, isAdmin, type }) => {
    const payload = {
      id,
      isAdmin,
      type,
    };
    const result = {
      token: jwt.sign(payload, JwtSecretKey, JwtOption),
      // refreshToken: randToken.uid(256)
    };
    return result;
  },
  verify: async ({ token }) => {
    let decoded;
    try {
      // verify를 통해 값 decode!
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        return TOKEN_INVALID;
      } else {
        return TOKEN_INVALID;
      }
    }
    return decoded;
  }
}