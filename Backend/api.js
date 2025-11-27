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
const cors = require("cors")
app.use(cors())


//CONFIGURANDO BODY PARSE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//REALIZANDO INSERT POST
app.post("/cad_func", function(req,res){
      Funcionarios.create({
      id_funcionario: req.body.id_funcionario,
      nome: req.body.nome,
      id_cargo: Number(req.body.cargo),
      data_admissao: req.body.data_admissao,
      usuario: req.body.usuario,
      senha: req.body.senha
    }).then(function(){
        res.status(200).json({message: "Funcionario cadastro com sucesso"});
    }).catch(function(erro){
        console.error(erro);
        res.status(500).json({message: "Erro ao cadastrar funcionario" + erro})
});
});

//LENDO OS CARGOS

app.get("/list_cargo", function(re,res){
  Cargo.findAll({
    //attributes:['nome']
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



// Criando Rota de Login

app.post("/login", async (req, res) => {
    const { usuario: usuarioFront, senha } = req.body;

    try {
        // Buscar o usuário no banco pelo campo 'usuario'
        const usuario = await Funcionarios.findOne({
            where: { usuario: usuarioFront }
        });

        if (!usuario) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        // Comparar a senha digitada com a senha do banco
        if (senha !== usuario.senha) {
            return res.status(401).json({ erro: "Senha incorreta" });
        }

        return res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome
            }
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: "Erro no servidor" });
    }
});