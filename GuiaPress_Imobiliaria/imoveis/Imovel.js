const Sequelize = require("sequelize");
const connection = require ("../database/database");
const Category = require ("../categories/Category");

const Imovel = connection.define('imoveis', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      quartos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Category.hasMany(Imovel);   // 1 categoria -> muitos artigos
Imovel.belongsTo(Category); // 1 artigo -> 1 categoria

module.exports = Imovel;