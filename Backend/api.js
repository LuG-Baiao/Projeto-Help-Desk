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
const bodyParser = require("body-parser")
const Funcionarios = require("./db/funcionario"); //importando  arquivo funcionarios
const Cargo = require("./db/cargo"); //importando cargo
const conexao = require("./db/connection");

//CONFIGURANDO BODY PARSE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//REALIZANDO INSERT POST
app.post("/cad_func", function(req,res){
      Funcionarios.create({
      id_funcionario: req.body.id_funcionario,
      nome: req.body.nome,
      id_cargo: req.body.id_cargo,
      data_admissao: req.body.data_admissao
    }).then(function(){
        res.send("Cargo cadastrado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao cadastrar o cargo" + erro);
})
});

//LENDO OS CARGOS

app.get("/list_cargo", function(re,res){
  Cargo.findAll({
    attributes:['nome']
  }).then(function(cargo){
    res.send({cargo: cargo})
  }).catch(function(erro){
        res.send("Erro ao buscar o cargo" + erro);
  })
});


//update no cargo

app.patch("/atualiza_cargo/:id", function(req,res){
    Cargo.update({
      nome: req.body.nome,
          },
      {where: {"id_cargo": req.params.id}}
    ).then(function(){
        res.send("Funcionario atualizado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao atualizar o funcionario" + erro);
})
});



//Delete 

app.delete("/delete/:id",function(req,res){
  Funcionarios.destroy({where: {"id_funcionario": req.params.id}}).then(function(){
    res.send("Funcionário deletado com sucesso");
  }).catch (function(erro){
        res.send("Erro ao buscar o cargo" + erro);
  });
});



//listando o servico

app.get("/lista_solicitacoes",async (req, res)=>{
  try {
    const [rows]= await conexao.sequelize.query(`
      select 
s.id_solicitacao, 
s.descricao_solicit ,
ss.desc_status  
from solicitacao s 
join status_servico ss on ss.id_status  =s.id_status 
      `);
  
  res.json(rows) ; } 
  catch (erro){
    res.status(500).send("Erro ao buscar resgistros" + erro);
  }
} );

app.listen(3000,function(){
  console.log("Servidor Rodando")
})