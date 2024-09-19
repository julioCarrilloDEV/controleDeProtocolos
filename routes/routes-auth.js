const express = require('express');
const router = express.Router();
const login = require('../model/login');
const cadastro = require('../model/cadastro');

// Rota para o login
router.get('/', (req, res) =>{
    res.render('login');
})

router.post('/', login);

// Rota para logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Rota para cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota para cadastro
router.post('/cadastro', cadastro);

module.exports = router;