const {Sequelize}= require("sequelize");

// db/connection.js
const sequelize = new Sequelize( 
    "db_user_1",
    "user_1",
    "Twq7e9YE-1!",
    {
        host: "phpmyadmin.uni9.marize.us",
        dialect: "mysql",
    }
);

sequelize.authenticate().then((function(){
    console.log("Conexão com o banco de dados realizada com sucesso.")
})).catch((function(erro){
    console.log("Não foi possível conectar ao banco de dados: "+ erro)
}));

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}