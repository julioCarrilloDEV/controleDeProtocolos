const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const edit_perfilModel = require('../model/edit_perfilModel');
const edit_senhaModel = require('../model/edit_senhaModel');
const editFoto = require('../model/edit_fotoModel');

router.get('/perfil', (req, res) => {
    if (req.session.user) {
        res.render('perfil', { 
            usuario: req.session.user.usuario,
            nome: req.session.user.nome,
            email: req.session.user.email,
            foto: req.session.user.foto,
            tipoUsuario: req.session.user.tipoUsuario,
            id: req.session.user.id
        });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

router.post('/perfil/upload/foto', upload.single('foto'), (req, res) => {
    if (req.session.user) {
        editFoto(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
})

router.post('/editar/perfil', (req, res) => {
    if (req.session.user) {
        edit_perfilModel(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

router.post('/editar/senha', (req, res) => {
    if (req.session.user) {
        edit_senhaModel(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

module.exports = router;  