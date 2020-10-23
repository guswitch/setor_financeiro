const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    pin:{
        type: String,
        required: true,
        expires: 43200  
    }
});

mongoose.model('Pin',PinSchema);