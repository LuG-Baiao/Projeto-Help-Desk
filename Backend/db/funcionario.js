const db = require('./connection');

const Funcionario = db.sequelize.define('funcionario', {
    id_funcionario: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
       
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    id_cargo: {
        type: db.Sequelize.INTEGER,
        allowNull: true
    },
    data_admissao: {
        type: db.Sequelize.DATEONLY,
        allowNull: true
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    usuario: {
        type: db.Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: 'funcionario',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
});



module.exports = Funcionario;