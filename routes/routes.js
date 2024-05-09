let express = require('express');
//método do express de rota
let router = express.Router();
let createUsuario = require('../model/createUsuario');
let realizarLogin = require('../model/login');


// Middleware para verificar se o usuário está autenticado
const requireAuth = (req, res, next) => {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!req.session.usuario) {
        res.redirect('/login');
    } else {
        // Se o usuário estiver autenticado, permite que a próxima rota seja chamada
        next();
    }
};

// Rota protegida que requer autenticação
router.get('/home', (req, res) => {
  res.send('Bem-vindo ao seu perfil!');
});

router.get('/home', (req, res) =>{
    res.render('home');
})

router.get('/login', (req, res) =>{
    res.render('login');
})

router.get('/cadastro', (req, res) =>{
    res.render('cadastro');
})

router.post('/cadastro', createUsuario);

// Rota para o login
router.post('/login', realizarLogin);

// Rota para o logout
router.get('/logout', (req, res) => {
    // Destroi a sessão
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
            res.status(500).send('Erro ao encerrar a sessão');
        } else {
            // Redireciona de volta para a página de login após o logout
            res.redirect('/login');
        }
    });
});

//exporta o módulo
module.exports = router