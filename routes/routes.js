let express = require('express');
//método do express de rota
let router = express.Router();
let createUsuario = require('../model/createUsuario');
let realizarLogin = require('../model/login');

// Rota para o login
router.get('/login', (req, res) =>{
    res.render('login');
})
router.post('/login', realizarLogin);

router.get('/cadastro', (req, res) =>{
    res.render('cadastro');
})

router.post('/cadastro', createUsuario);

// Rota que requer autenticação
router.get('/home', (req, res) => {
    // Verifica se o usuário está autenticado
    if (req.session.usuario) {
        res.render('home', { 
            nomeUsuario: req.session.usuario.nomeUsuario,
            tipo_usuario: req.session.usuario.tipo_usuario,
            usuario: req.session.usuario.usuario
         });
    } else {
        res.redirect('/login');
    }
});

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