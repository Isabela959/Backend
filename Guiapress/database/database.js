//Acessa a biblioteca sequelize
const Sequelize = require ("sequelize");

//Configura a conexão com o Database
const connection = new Sequelize('guiapressisa', 'root', '1234', {
    host: 'localhost', 
    dialect: 'mysql',
    timezone: "-03:00"
})

//Exportar essa configuração para o index
module.exports = connection;