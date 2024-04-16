import express from 'express';

const express = require('express');
const app = express();
const alunosRouter = require('./routes/alunos');
const PORT = 4000;

app.use(express.json());

app.use('/alunos', alunosRouter);

app.listen(PORT, () => {
  console.log(`Servidor esta rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor!');
});
