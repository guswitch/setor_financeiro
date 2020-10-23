const {promisify} = require('util');
const jwt = require('jsonwebtoken')

const tokenSettings = require('../../config/auth');

module.exports = async (req,res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
    return res.status(401).json({error: 'Token não fornecido'});

    const [, token] = authHeader.split(' ');

    try {
       const decoded = await promisify(jwt.verify)(token, tokenSettings.ttl);

       req.UserId = decoded.id;

       return next();
    } catch(error) {
       return res.status(401).json({error: 'Token Invalido'});
    }

}