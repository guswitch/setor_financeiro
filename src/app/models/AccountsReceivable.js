const mongoose = require('mongoose');

const AccountsReceivableSchema = new mongoose.Schema({
    debtorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true,
        ref: 'Debtor'
    },
    price:{
        type: Number,
        required: true,
    },
    emissionDate:{
        type: Date,
        required: true,
    },
    maturityDate:{
        type: Date,
        required: true,
    },
    received: {
        type: Boolean,
        required: true,
        default: false
    }
});

mongoose.model('AccountsReceivable',AccountsReceivableSchema);