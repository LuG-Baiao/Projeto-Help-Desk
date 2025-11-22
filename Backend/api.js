// Apllication Programming Interface
//Rest - Representational State Transfer

//Get 
//Post
//Put / pacth
//Delete

//import express from 'express';
const express = require('express');
const app = express();
const port = 3000;  

app.get("/",function(req,res){
  res.send("Tela Login") //send é o q será enviado para o front end
});

app.get("/Home",function(req,res){
  res.send("Direcionamento para tela principal")
});

app.get("/cadastro_cliente",function(req,res){
  res.send("Cadastrar Clientes")
});

app.listen(port, () => console.log(`Server running at port ${port}`));

app.get('/', (req, res) => {
  res.send('API Backend - Projeto Inclusão Social');
});