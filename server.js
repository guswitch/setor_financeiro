console.clear();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requireDir = require('require-dir');

// Iniciando o app
const app = express();
app.use(express.json()); // Permitir o uso do envio de dados por JSON 
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/setor_financeiro',{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }); // Criando o DB

requireDir('./src/app/models'); // Usando a biblioteca require-dir para registrar todos os models de uma vez

app.use("/api", require('./src/routes')); // Declarando todas as rotas

app.listen(3001);
console.log('\x1b[36m%s\x1b[0m','Server inciado em localhost:3001');