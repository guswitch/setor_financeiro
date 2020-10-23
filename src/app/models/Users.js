const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenSettings = require('../../config/auth');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Usando um hook para capturar o evento de save a criptografando a senha antes de ser cadastrada
UserSchema.pre('save', async function (next) {
    // Se a senha não for modificada va para o proximo hook, ou como ali não tem continua o codigo
    if (!this.isModified('password'))
        return next()

    // Caso seja a senha receberá a criptografia
    this.password = await bcrypt.hash(this.password, 8);
});

// Comparando a senha criptografada com a que o usuario digitou
UserSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    }
}

// Gerando o Token para autenticação com JWT
UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, tokenSettings.secret, { expiresIn: tokenSettings.ttl })
    }
}

mongoose.model('User', UserSchema);