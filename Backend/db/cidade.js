const db = require("./connection");

const Cidade = db.sequelize.define('dim_cidade',{
    id_cidade: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    uf:{
        type: db.Sequelize.STRING,
        allowNull:false
    }
},{
    tableName: 'dim_cidade',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
});

module.exports = Cidade;