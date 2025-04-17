//Acessa a biblioteca sequelize
const Sequelize = require ("sequelize");

//Configura a conexão com o Database
const connection = new Sequelize('guiapress', 'root', '1234', {
    host: 'localhost', 
    dialect: 'mysql'
})

//Exportar essa configuração para o index
module.exports = connection;