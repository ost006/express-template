// Cross-Origin Resource Sharing(CORS) Setup
const cors = require('cors');

// 환경변수에서 Array로 관리
const origins = JSON.parse(process.env.CORS_ALLOW_URLS)
const corsSetup = cors({
  origin: (origin, callback) => {
    // 요청 데이터에 origin 없을 경우 no-domain으로 변경
    if (origin === undefined) origin = 'no-domain'

    if (origins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed Origin'))
    }
  },
  credentials: true,
});

module.exports = corsSetup;