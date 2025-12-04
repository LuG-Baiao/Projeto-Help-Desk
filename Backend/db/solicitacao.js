const db = require("./connection")

const Solicitacao = db.sequelize.define('solicitacao',{
    id_solicitacao:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    data_solcitacao: {
        type: db.Sequelize.DATE,
        
    },
    descricao_solicit: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    id_status: {
        type: db.Sequelize.INTEGER,
        allowNull: false,

    },
    id_cliente: {
        type: db.Sequelize.INTEGER,
        allowNull:false
    },
    id_funcionario: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    id_tipo_servico:{
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'solicitacao',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
} );

module.exports = Solicitacao;