const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generatePin } = require('generate-pin');

const emailSettings = require('../../config/email');
const tokenSettings = require('../../config/auth');

const User = mongoose.model('User');
const Token = mongoose.model('Token');
const Pin = mongoose.model('Pin');

const transporter = nodemailer.createTransport({
    host: emailSettings.host,
    port: emailSettings.port,
    auth: {
        user: emailSettings.auth.user, 
        pass: emailSettings.auth.pass
    }
});

module.exports = {

    // Metodo Index de retorno de todos usuarios
    async Index(req,res){
        const users = await User.find();
        return res.json(users);
    },

    // Metodo Details
    async Profile(req, res){
        const user = await User.findById(req.params.id);

        if(!user)
        return res.status(404).json({error: 'Usuario não encontrado'});

        return res.json(user);
    },

    // Metodo Create
    async Register(req,res){
        const { email } = req.body; 
        if(await User.findOne({email}))
        return res.status(400).json({error:'Usuario já existente'});

        const user = await User.create(req.body);

        const token = await Token.create({_userId: user._id, token: jwt.sign({email},tokenSettings.secret,{expiresIn: tokenSettings.ttl})});

        let mailOptions = {
            from: emailSettings.auth.user,
            to: email,
            subject: 'Confirmação de email - Kurriculum',
            text: `Olá, aqui está seu link de validação: \n
            http:\/\/${req.headers.host}\/api\/User\/ConfirmEmail\/${token.token}`
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error)
            return res.json(error);
            else
            return res.json(`Um e-mail de confirmação foi enviado para: ${email}`);
        });
    },

    // Confirmar email
    async ConfirmEmail(req,res){
        Token.findOne({token: req.params.token},(error,token)=>{
            if(!token) 
            return res.status(400).send('Token Expirado')

            User.findOne({_id: token._userId},(error,user) => {
                if(!user)
                return res.status(400).send('Não foi possivel localizar o usúario desse token');

                if(user.isVerified)
                return res.status(400).send('Token já validado');

                user.isVerified = true;

                user.save((error)=>{
                    if(error)
                    return res.status(500).send(error.message);

                    return res.status(200).send('Email verificado faça o login');
                });
            });
        });
    },

    // Reenviando o email
    async ResendEmail(req,res){
        const {email} = req.body;

        User.findOne({email: req.body.email},(error,user)=>{
            if(!user)
            return res.status(400).json({error:'Nenhum usuario foi encontrado com esse email'});

            if(user.isVerified)
            return res.status(400).json({error:'Essa conta já foi verificada'});

        });

        const token = await Token.create({_userId: user._id, token: jwt.sign({email},tokenSettings.secret,{expiresIn: tokenSettings.ttl})})
    
            let mailOptions = {
                from: emailSettings.auth.user,
                to: email,
                subject: 'Confirmação de email - Kurriculum',
                text: `Olá, aqui está seu link de validação: \n
                http:\/\/${req.headers.host}\/api\/User\/ConfirmEmail\/${token.token}`
            }
    
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error)
                return res.json(error);
                else
                return res.json({msg:`Um e-mail de confirmação foi enviado para: ${email}`});
            });

    },

    // Metodo Update
    async UpdateProfile(req,res){
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(user);
    },

    //Enviar email para recuperar senha
    async RecoverPassword(req,res){
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user)
        return res.status(400).json({error: 'Usuario não encontrado'})

        const number = generatePin(1);
        
        await Pin.findOneAndDelete({_userId: user._id});
        await Pin.create({_userId: user._id,pin: number[0]})

        let mailOptions = {
            from: emailSettings.auth.user,
            to: email,
            subject: 'Recuperação de senha - Setor financeiro',
            text: `Olá, aqui está seu pin de recuperação de senha: \n
            ${number}`
           
        }
        
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err)
            return res.json(err)
            else
            return res.json(`Um email de recuperção foi enviado para ${email}`);
        });
        
    },

    async ComparePin(req,res){
        const {pin,email} = req.body;
        const user = await User.findOne({email});
        const Pins = await Pin.findOne({_userId: user._id});
        
        if(Pins.pin == pin)
        return res.json(true);

        return res.json(false);
    },

    async UpdatePassword(req,res){
        const {email,password} = req.body;
        const _password = await bcrypt.hash(password,8);
        const __password = await User.findOneAndUpdate({email: email},{password: _password},{new: true});
        return res.json(__password);
    },
    
    // Metodo Delete
    async DeleteProfile(req,res){
        const user = await User.findByIdAndDelete(req.params.id);
        return res.send({msg:'Excluido com sucesso'});
    },
}