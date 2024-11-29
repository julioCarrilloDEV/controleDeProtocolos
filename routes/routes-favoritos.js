const express = require('express');
const router = express.Router();
const favoritos = require('../model/favoritos');

router.get('/favoritos', (req, res) => {
    if (req.session.user) {
        res.render('favoritos', { usuario: req.session.user.usuario });
    } else {
        res.redirect('/?message=disconnect');
    }
});

router.get('/api/favoritos', (req, res) => {
    if (req.session.user) {
        favoritos(req, res);
    } else {
        res.redirect('/?message=disconnect');
    }
});

module.exports = router;