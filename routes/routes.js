let express = require('express');
//método do express de rota
let router = express.Router();
let create = require('../controller/createUsuario');


router.get('/home', (req, res) =>{
    res.render('home');
})

router.get('/login', (req, res) =>{
    res.render('login');
})

router.get('/cadastro', (req, res) =>{
    res.render('cadastro');
})

router.post('/cadastro', create);

//exporta o módulo
module.exports = router