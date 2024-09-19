const express = require('express');
const router = express.Router();
const protocolos = require('../model/protocolos');

// Rota para a página de protocolos
router.get('/protocolos', (req, res) => {
    if (req.session.user) {
        res.render('protocolos', { usuario: req.session.user.usuario });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});
// Rota para buscar protocolos via AJAX com validação de sessão
router.get('/api/protocolos', (req, res) => {
    if (req.session.user) {
        protocolos(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

module.exports = router;