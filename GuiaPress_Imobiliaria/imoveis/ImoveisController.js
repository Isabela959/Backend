const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Imovel = require("./Imovel");
const slugify = require("slugify");

// Listar todos os imóveis
router.get("/admin/imoveis", (req, res) => {
    Imovel.findAll({
        include: [{ model: Category }]
    }).then(imoveis => {
        res.render("admin/imoveis/index", { imoveis });
    }).catch(err => {
        console.error("Erro ao buscar imóveis:", err);
        res.redirect("/");
    });
});

// Formulário para criar novo imóvel
router.get("/admin/imoveis/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/imoveis/new", { categories });
    }).catch(err => {
        console.error("Erro ao carregar categorias:", err);
        res.redirect("/admin/imoveis");
    });
});

// Salvar ou atualizar imóvel
router.post("/imoveis/save", (req, res) => {
    const { id, title, body, category } = req.body;

    if (!title || !body || !category) {
        return res.redirect("/admin/imoveis");
    }

    if (id) {
        // Atualizar imóvel existente
        Imovel.update({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category,
            preco: preco,
            quartos: quartos,
            endereco: endereco
        }, {
            where: { id: id }
        }).then(() => {
            res.redirect("/admin/imoveis");
        }).catch(err => {
            console.error("Erro ao atualizar imóvel:", err);
            res.redirect("/admin/imoveis");
        });
    } else {
        // Criar novo imóvel
        Imovel.create({
            title: title,
            slug: slugify(title),
            descricao: descricao,
            categoryId: category,
            preco: preco,
            quartos: quartos,
            endereco: endereco
        }).then(() => {
            res.redirect("/admin/imoveis");
        }).catch(err => {
            console.error("Erro ao salvar imóvel:", err);
            res.redirect("/admin/imoveis/new");
        });
    }
});

// Deletar imóvel
router.post("/imoveis/delete", (req, res) => {
    const id = req.body.id;

    if (id && !isNaN(id)) {
        Imovel.destroy({
            where: { id: id }
        }).then(() => {
            console.log("imóvel deletado, ID:", id);
            res.redirect("/admin/imoveis");
        }).catch(err => {
            console.error("Erro ao deletar imóvel:", err);
            res.redirect("/admin/imoveis");
        });
    } else {
        res.redirect("/admin/imoveis");
    }
});

// Editar imóvel
router.get("/admin/imoveis/edit/:id", (req, res) => {
    const id = req.params.id;

    Imovel.findByPk(id).then(imovel => {
        if (imovel) {
            Category.findAll().then(categories => {
                res.render("admin/imoveis/edit", {
                    imovel: imovel,
                    categories: categories
                });
            }).catch(err => {
                console.error("Erro ao buscar categorias:", err);
                res.redirect("/admin/imoveis");
            });
        } else {
            res.redirect("/admin/imoveis");
        }
    }).catch(err => {
        console.error("Erro ao buscar imóvel:", err);
        res.redirect("/admin/imoveis");
    });
});

Imovel.sync({force: false})
module.exports = router;
