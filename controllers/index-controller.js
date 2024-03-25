const response = require('../modules/response');

const indexController = (req, res, next) => {
    return res.status(200).send(response.Success(req.params.uid));
}

module.exports = {
    indexController,
}