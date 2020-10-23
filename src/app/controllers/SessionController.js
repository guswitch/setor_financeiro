const mongoose = require('mongoose');

const User = mongoose.model('User')
const Token = mongoose.model('Token')

module.exports = {
    // Metodo para verificar o login
     async Store(req, res) {
        // Desestruturando o corpo da requisição
        const {email, password} = req.body;
        // Tentando achar algum usuario que tenha esse determinado email
        const user = await User.findOne({email});
        // Verificando se foi ou não retornado algum usuario
        if(!user){
            return res.status(400).json({error:'Usuario não encontrado'});
        }
        
        if(!await user.compareHash(password)){
            return res.status(400).json({error:'Senha Invalida'});
        }

        // const token = await Token.create({_userId: user._id, token: jwt.sign({email},tokenSettings.secret,{expiresIn: tokenSettings.ttl})});
        const token = await Token.create({_userId: user._id, token: User.generateToken(user)});

        // return res.json({user, token: User.generateToken(user)});
        return res.json({token: token.token});
    },

    /*async ReturnUserByToken(req,res){
        const {tokenn} = req.body;

        const tokenRes = await Token.findOne({tokenn});

        const user = await User.findOne({_id: tokenRes._userId});

        return res.json(user.name);

    }*/

}