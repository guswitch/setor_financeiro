const mongoose = require('mongoose');

const AccountsReceivable = mongoose.model('AccountsReceivable');
// require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req,res){
        const accounts = await AccountsReceivable.find();
        return res.json(accounts);
    },

    // Metodo Details
    async Details(req, res){
        const account = await AccountsReceivable.findById(req.params.id).populate('debtorId','name');

        if(!account)
        return res.status(404).json({error: 'account not found'});

        return res.json(account);
    },

    // Metodo Create
    async Create(req,res){
        const account = await AccountsReceivable.create(req.body);
        return res.json(account)
    },

    // Metodo Update
    async Update(req,res){
        const account = await AccountsReceivable.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(account);
    },

    // Metodo Delete
    async Delete(req,res){
        const account = await AccountsReceivable.findByIdAndDelete(req.params.id);
        return res.json({msg:'Excluido com sucesso'});
    },
}