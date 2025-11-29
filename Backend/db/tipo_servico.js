const db = require("./connection")

const Tipo_Servico = db.sequelize.define('tipo_servico',{
    id_tipo_servico:{
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    desc_servico: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
},{
    tableName: 'tipo_servico',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
} );

module.exports = Tipo_Servico;