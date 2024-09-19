const express = require('express');
const router = express.Router();
const favoritos = require('../model/favoritos');

router.get('/favoritos', (req, res) => {
    if (req.session.user) {
        res.render('favoritos', { usuario: req.session.user.usuario });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

router.get('/api/favoritos', (req, res) => {
    if (req.session.user) {
        favoritos(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

module.exports = router;