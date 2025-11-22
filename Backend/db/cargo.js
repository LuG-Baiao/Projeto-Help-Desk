const db = require('./connection');

const Cargo = db.sequelize.define('cargo',{
    id_cargo: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'cargo',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
});

module.exports =Cargo
