//Chama as bibliotecas 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

// View engine
//a parte visual vai ser construída com ejs
app.set('view engine','ejs');

// Static
//Leitura de Arquivos Estáticos
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Conexão com o Database
//caso a autenticação funcione, aparece a mensagem de sucesso, se não, ele pega o erro e o mostra.
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

// Criar Rotas
app.use("/",categoriesController);    
app.use("/",articlesController);


//Primeira Rota: Raiz
app.get("/", (req, res) => {
    res.render("index");
})

//Criar Servidor
//Configura para a porta 8080
app.listen(4000, () => {
    console.log("O servidor está rodando!")
})