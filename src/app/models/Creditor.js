const mongoose = require('mongoose');

const CreditorSchema = new mongoose.Schema({
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Departaments'
    },
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

mongoose.model('Creditor', CreditorSchema);