const db = require('./connection');

const LogEmail = db.sequelize.define('log_envio_email',{
    id_log: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement: true
    },
    data_envio: {
        type: db.Sequelize.DATE
    },
    email_enviado: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'log_envio_email',   // <-- FORÇA O NOME DA TABELA CORRETO
    freezeTableName: true,      // <-- IMPEDIR O PLURAL AUTOMÁTICO
    timestamps: false           // <-- REMOVE createdAt e updatedAt
} )

module.exports = LogEmail;