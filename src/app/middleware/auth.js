const {promisify} = require('util');
const jwt = require('jsonwebtoken')

require('dotenv/config');

module.exports = async (req,res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
    return res.status(401).json({error: 'Token não fornecido'});

    const [, token] = authHeader.split(' ');

    try {
       const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_TTL);

       req.UserId = decoded.id;

       return next();
    } catch(error) {
       return res.status(401).json({error: 'Token Invalido'});
    }

}