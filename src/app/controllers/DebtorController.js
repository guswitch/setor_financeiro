const mongoose = require('mongoose');
const axios = require('axios');

const Debtor = mongoose.model('Debtor');
// require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req, res) {
        const creditors = await Debtor.find();
        return res.json(creditors);
    },

    // Metodo Details
    async Details(req, res) {
        const creditor = await Debtor.findById(req.params.id);

        if (!creditor)
            return res.status(404).json({ error: 'creditor not found' });

        return res.json(creditor);
    },

    // Metodo Create
    async Create(req, res) {
        const { cnpj } = req.body;

        
            const response = await axios.default.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
            let {
                atividade_principal,
                nome,
                telefone,
                email,
                situacao,
                cep,
                abertura
            } = response.data;

            let allData = {
                cnpj,
                situation: situacao,
                name: nome,
                // opening: abertura,
                mainlyActivty: atividade_principal[0].text,
                email,
                phone: telefone,
                cep,
            };

            const creditor = await Debtor.create(allData);
            return res.json(creditor)
        
    },

    // Metodo Update
    async Update(req, res) {
        const creditor = await Debtor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(creditor);
    },

    // Metodo Delete
    async Delete(req, res) {
        const creditor = await Debtor.findByIdAndDelete(req.params.id);
        return res.json({ msg: 'Excluido com sucesso' });
    },
}