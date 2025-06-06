//Acessa a biblioteca sequelize
const Sequelize = require ("sequelize");

//Configura a conexão com o Database
const connection = new Sequelize('imobiliariaisa', 'root', '1234', {
    host: 'localhost', 
    dialect: 'mysql',
//O banco registra o horário das alterações, por isso é preciso configurar o fuso horário para o nosso
    timezone: "-03:00"
})

//Exportar essa configuração para o index
module.exports = connection;