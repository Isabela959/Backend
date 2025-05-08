const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

// Listar todos os artigos
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [Category]
    }).then(articles => {
        res.render("admin/articles/index", {articles});
    }).catch(err => {
        console.log("Erro ao buscar artigos:", err);
        res.redirect("/");
    });
});

//Formulário para criar nvo artigo
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories});
    }).catch(err => {
        console.log("Erro ao carregar categorias:", err);
        res.redirect("/admin/articles");
    });
});

//Salvar artigo no banco
router.post("/articles/save", (req, res) => {
    const {title, body, category} = req.body;

    //depuração
    console.log("Dados recebidos:", title, body, category);

    if (title && body && category) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles");
        }).cacth(err => {
            console.error("Erro ao salvar artigo:", err);
            res.redirect("/admin/articles/new");
        });
    } else {
        res.redirect("/admin/articles/new");
    }
});

module.exports = router;

