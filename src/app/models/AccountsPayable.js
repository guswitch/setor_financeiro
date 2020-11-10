const mongoose = require('mongoose');

const AccountsPayableSchema = new mongoose.Schema({
    creditorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // unique: true,
        ref: 'Creditor'
    },
    price:{
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    emissionDate:{
        type: Date,
        required: true,
    },
    maturityDate:{
        type: Date,
        required: true,
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    }
});

mongoose.model('AccountsPayable',AccountsPayableSchema);