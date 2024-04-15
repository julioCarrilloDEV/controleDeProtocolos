let express = require('express');
//método do express de rota
let router = express.Router()


router.get('/home', (req, res) =>{
    res.render('home');
})

router.get('/login', (req, res) =>{
    res.render('login');
})

//exporta o módulo
module.exports = router