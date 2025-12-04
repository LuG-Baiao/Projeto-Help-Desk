const db = require("./connection");

const Cliente = db.sequelize.define('cliente',{
    id_cliente:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    cpf_cnpj: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    endereco:{
        type: db.Sequelize.STRING,
        allowNull: false 
    },
    id_cidade: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    cep: {
        type: db.Sequelize.STRING
    },
    bairro: {
        type:db.Sequelize.STRING
    },
    telefone:{
        type: db.Sequelize.STRING,
        allowNull:false
    }
},{
    tableName: 'cliente',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
});

module.exports = Cliente