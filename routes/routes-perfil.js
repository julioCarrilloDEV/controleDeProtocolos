const express = require('express');
const router = express.Router();
const perfilModel = require('../model/perfilModel');

router.get('/perfil', (req, res) => {
    if (req.session.user) {
        res.render('perfil', { 
            usuario: req.session.user.usuario,
            nome: req.session.user.nome,
            email: req.session.user.email,
            tipoUsuario: req.session.user.tipoUsuario,
            id: req.session.user.id
        });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

router.get('/api/perfil', (req, res) => {
    if (req.session.user) {
        perfilModel(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

module.exports = router;  