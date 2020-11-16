console.clear();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const requireDir = require('require-dir');
require('dotenv/config');

// Iniciando o app
const app = express();
app.use(express.json()); // Permitir o uso do envio de dados por JSON 
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }); // Criando o DB

requireDir('./src/app/models'); // Usando a biblioteca require-dir para registrar todos os models de uma vez

app.use("/api", require('./src/routes')); // Declarando todas as rotas

app.listen(3001, () => console.log('Server iniciado em http://localhost:3001'));