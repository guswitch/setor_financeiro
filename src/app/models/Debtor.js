const mongoose = require('mongoose');

const DebtorSchema = new mongoose.Schema({
    cnpj: {
        type: String,
        required: true,
        unique: true,
    },
    situation: {
        type: String
    },
    name: {
        type: String,
    },
    mainlyActivty: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    cep: {
        type: String,
    }
});

mongoose.model('Debtor',DebtorSchema);