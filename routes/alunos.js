import express from 'express';

const express = require('express');
const router = express.Router();

let alunos = [];

router.post('/', (req, res) => {
  const { RA, Nome, Turma } = req.body;
  alunos.push({ RA, Nome, Turma, Cursos: [] });
  res.json({ message: 'Aluno adicionado com sucesso!' });
});

router.post('/:RA/cursos', (req, res) => {
  const { RA } = req.params;
  const { Curso } = req.body;
  const aluno = alunos.find(aluno => aluno.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.Cursos.push(Curso);
  res.json({ message: 'Curso adicionado para o aluno com sucesso!' });
});

router.put('/:RA', (req, res) => {
  const { RA } = req.params;
  const { Nome, Turma } = req.body;
  const aluno = alunos.find(aluno => aluno.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.Nome = Nome;
  aluno.Turma = Turma;
  res.json({ message: 'Dados do aluno atualizados com sucesso!' });
});

router.put('/:RA/cursos/:Curso', (req, res) => {
  const { RA, Curso } = req.params;
  const { NovoCurso } = req.body;
  const aluno = alunos.find(aluno => aluno.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  const index = aluno.Cursos.findIndex(curso => curso === Curso);
  if (index === -1) return res.status(404).json({ message: 'Curso não encontrado para este aluno' });
  aluno.Cursos[index] = NovoCurso;
  res.json({ message: 'Curso do aluno atualizado com sucesso!' });
});

router.delete('/:RA', (req, res) => {
  const { RA } = req.params;
  alunos = alunos.filter(aluno => aluno.RA !== RA);
  res.json({ message: 'Aluno removido com sucesso!' });
});

router.delete('/:RA/cursos/:Curso', (req, res) => {
  const { RA, Curso } = req.params;
  const aluno = alunos.find(aluno => aluno.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  aluno.Cursos = aluno.Cursos.filter(curso => curso !== Curso);
  res.json({ message: 'Curso removido do aluno com sucesso!' });
});

router.get('/', (req, res) => {
  res.json(alunos.map(aluno => ({ RA: aluno.RA, Nome: aluno.Nome, Turma: aluno.Turma })));
});

router.get('/:RA', (req, res) => {
  const { RA } = req.params;
  const aluno = alunos.find(aluno => aluno.RA === RA);
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json({
    Nome: aluno.Nome,
    Turma: aluno.Turma,
    Cursos: cursos
  });
});

module.exports = router;
