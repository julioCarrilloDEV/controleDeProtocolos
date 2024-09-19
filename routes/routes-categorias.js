const express = require('express');
const router = express.Router();
const categorias = require('../model/categorias');

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

module.exports = router;