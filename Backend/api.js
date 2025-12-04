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
const Status = require("./db/status_servico") // importando status
const Clientes =require("./db/cliente") // importando clientes
const tp_Servico = require("./db/tipo_servico") // importando tipo_servico
const Solicitacoes = require("./db/solicitacao") // importando solitacao
const Cidades =require("./db/cidade"); // importando cidades
const conexao = require("./db/connection");
const envio_email = require("./utils/email");
const LogEmail = require("./db/logEmail");
const cors = require("cors")
const {Op} = require("sequelize");

app.use(cors())

app.listen(3000,function(){
console.log("Servidor Rodando")
})

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

app.get("/lista_solicitacoes", async (req, res) => {
  try {
    const { filtro } = req.query;

    let sql = `
      SELECT 
        s.id_solicitacao, 
        s.descricao_solicit,
        ss.desc_status,
        c.nome AS cliente,
        c.email,
        c.telefone,
        c.cpf_cnpj,
        f.nome AS responsavel,
        ts.desc_servico 
      FROM solicitacao s
      JOIN status_servico ss ON ss.id_status = s.id_status
      JOIN cliente c ON c.id_cliente = s.id_cliente
      JOIN funcionario f ON f.id_funcionario = s.id_funcionario
      JOIN tipo_servico ts ON ts.id_tipo_servico = s.id_tipo_servico
      order by s.id_solicitacao asc
    `;

    // adiciona filtro caso exista
    if (filtro) {
      sql += ` WHERE s.id_solicitacao LIKE '%${filtro}%' 
                   OR c.nome LIKE '%${filtro}%' 
                   OR c.cpf LIKE '%${filtro}%'`;
    }

    const [rows] = await conexao.sequelize.query(sql);

    res.json(rows);

  } catch (erro) {
    res.status(500).send("Erro ao buscar registros: " + erro)
    res.status(500).json({ message: erro.message, stack: erro.stack });;
  }
});


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

// listando status

app.get("/Status", function(re,res){
  Status.findAll({
    
  }).then(function(status){
    res.send({status: status})
  }).catch(function(erro){
        res.send("Erro ao buscar estatus" + erro);
  })
});

//listando serviços
app.get("/tp_servico", function(re,res){
  tp_Servico.findAll({
  }).then(function(servico){
    res.send({servico: servico})
  }).catch(function(erro){
        res.send("Erro ao buscar estatus" + erro);
  })
});

//listando clientes
app.get("/busca_cliente/:cpf", async function(req, res) {
  try {
    const cpf = req.params.cpf;

    const cliente = await Clientes.findOne({
      where: { cpf_cnpj: cpf },
      attributes: ["id_cliente", "cpf_cnpj", "nome"]
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    res.status(200).json(cliente);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ message: "Erro ao buscar cliente: " + erro });
  }
});

//cadastrando servico

app.post("/cria_solicit", async function(req, res) {
    try {
        const solicitacao = await Solicitacoes.create({
            descricao_solicit: req.body.descricao_solicit,
            id_status: req.body.id_status,
            id_cliente: req.body.id_cliente,
            id_funcionario: req.body.id_funcionario,
            id_tipo_servico: req.body.id_tipo_servico
        });

        // Buscar o cliente
        const cliente = await Clientes.findOne({
            where: { id_cliente: req.body.id_cliente }
        });

        const resp =await Funcionarios.findOne({
          where: {id_funcionario: req.body.id_funcionario}
        })

        if (!cliente) {
            return res.status(404).json({
                message: "Não foi possivel criar uma solicitacao, cliente não encontrado."
            });
        }

        // Enviar e-mail usando o util
        await envio_email(
          cliente.email, "Nova solicitação criada", 
          `Olá ${cliente.nome}, sua solicitação foi criada com o ID: ${solicitacao.id_solicitacao}.\n O(a) Tecnico Resposavel é: ${resp.nome}`);

        // Log
        await LogEmail.create({
            data_envio: new Date(),
            email_enviado: cliente.email
        });

        return res.status(200).json({
            message: "Solicitação criada e e-mail enviado com sucesso!",
            id_solicitacao: solicitacao.id_solicitacao
        });

    } catch (erro) {
        console.error(erro);
       // return res.status(500).json({
          //  message: "Erro ao criar solicitação ou enviar e-mail",
          //  erro
      //  });
    }
});

// lista funcionarios

app.get("/lista_funcionarios", function(re,res){
  Funcionarios.findAll({
    attributes:['id_funcionario','nome']
  }).then(function(funcionarios){
    res.send({funcionarios: funcionarios})
  }).catch(function(erro){
        res.send("Erro ao buscar estatus" + erro);
  })
});

//Atualizando status do servico;

app.patch("/atualiza_status_servico/:id_solicitacao", async function(req, res) {
    const id_solicitacao = req.params.id_solicitacao;
    const novoStatus = req.body.id_status;

    try {
        // Atualiza o status
        await Solicitacoes.update(
            { id_status: novoStatus },
            { where: { id_solicitacao } }
        );

        // Busca o cliente da solicitação
        const solicitacao = await Solicitacoes.findOne({ 
            where: { id_solicitacao } 
        });

        if (!solicitacao) {
            return res.status(404).json({ mensagem: "Solicitação não encontrada" });
        }

        const cliente = await Clientes.findOne({ 
            where: { id_cliente: solicitacao.id_cliente } 
        });

        const desc_status = await Status.findOne({
          where:{id_status: solicitacao.id_status}
        })
        if (cliente && cliente.email) {
            // Envia o e-mail notificando a mudança de status
            await envio_email(
                cliente.email,
                "Atualização de Status da Solicitação",
                `Olá ${cliente.nome}, sua solicitação de ID ${id_solicitacao} teve o status alterado para ${desc_status.desc_status}.`
            );
        }

        res.json({ mensagem: "Status atualizado com sucesso!" });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: "Erro ao atualizar status: " + erro });
    }
});




app.get("/clientes", async (req, res) => {
    try {
        const { filtro } = req.query;

        const where = {};

        if (filtro) {
            where[Op.or] = [
                { nome: { [Op.like]: `%${filtro}%` } },
                { email: { [Op.like]: `%${filtro}%` } },
                { cpf_cnpj: { [Op.like]: `%${filtro}%` } }
            ];
        }

        const clientes = await Clientes.findAll({ where });

        res.json(clientes);
    } catch (erro) {
        console.log("Erro ao buscar clientes:", erro);
        res.status(500).json({ msg: "Erro no servidor." });
    }
});

//Listando Cidade

app.get("/cidade", function(req, res){
  Cidades.findAll()
    .then(cidade => res.json({ cidade }))
    .catch(erro => res.status(500).send("Erro ao buscar cidade " + erro));
});



//cadastrando cliente

app.post("/cad_cliente", function(req,res){
      console.log("body recebido",req.body);
      Clientes.create({
      nome: req.body.nome,
      cpf_cnpj: req.body.cpf_cnpj,
      email: req.body.email,
      endereco: req.body.endereco,
      id_cidade: req.body.id_cidade,
      cep: req.body.cep,
      bairro: req.body.bairro,
      telefone: req.body.telefone
    }).then(function(cad_cliente){
        res.status(200).json({message: "Cliente Cadastrado"
          
        });
    }).catch(function(erro){
        console.error(erro);
        res.status(500).json({message: "Erro ao cadastrar cliente" + erro}
        
        )
});
});
