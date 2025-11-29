const db =require('./connection')

const Status_Servico = db.sequelize.define('status_servico',{
    id_status: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    desc_status: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
},{
    tableName: 'status_servico',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
});

module.exports = Status_Servico;