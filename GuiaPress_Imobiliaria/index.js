const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const Category = require("./categories/Category");
const Imovel = require("./imoveis/Imovel");

const categoriesController = require("./categories/CategoriesController");
const imoveisController = require("./imoveis/ImoveisController");
const usersController = require("./users/UsersController");

// view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));


//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log('conexão feita com sucesso');
    }).catch((error) => {
        console.log(error);
    })

app.use("/", categoriesController);
app.use("/", imoveisController);
app.use("/", usersController);

app.get("/", (req,res) => {
    Imovel.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(imoveis => {
        res.render("index", {imoveis: imoveis});
    })
});


app.get("/:slug", (req,res) => {
    var slug = req.params.slug;
    Imovel.findOne({
        where : {
            slug: slug
        }
    }).then(imovel => {
        if(imovel != undefined){
            res.render("imovel", {imovel:imovel});
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})
app.listen(4001, () => {
    console.log("o servidor está rodando")
})