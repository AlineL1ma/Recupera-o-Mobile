require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const obrasRouter = require('./routes/obras');
const fiscalizacoesRouter = require('./routes/fiscalizacoes');
const path = require('path');
const connectDB = require('./config/database');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/obras', obrasRouter);
app.use('/fiscalizacoes', fiscalizacoesRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
