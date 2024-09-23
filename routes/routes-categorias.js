const express = require('express');
const router = express.Router();
const categorias = require('../model/categorias');
const categorias_protocolos = require('../model/categorias-protocolos');

// Rota para a página de categorias
router.get('/categorias', (req, res) => {
    if (req.session.user) {
        res.render('categorias', { usuario: req.session.user.usuario });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

// Rota para buscar categorias via AJAX com validação de sessão
router.get('/api/categorias', (req, res) => {
    if (req.session.user) {
        categorias(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});


// Rota para acessar protocolos associados a uma categoria
router.get('/categorias/protocolos', (req, res) => {
    if (req.session.user) {
        res.render('categoriasProtocolos', { idCategoria: req.params.idCategoria });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

// Rota para buscar protocolos associados a uma categoria
router.get('/api/categorias/protocolos/:idCategoria', (req, res) => {
    if (req.session.user) {
        console.log(`Accessing /api/categorias/protocolos/${req.params.idCategoria}`);
        categorias_protocolos(req, res);
    } else {
        res.status(401).send('Você foi desconectado.');
    }
});
module.exports = router;