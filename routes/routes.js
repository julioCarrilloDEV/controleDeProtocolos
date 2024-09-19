let express = require('express');
//método do express de rota
const router = express.Router();
const login = require('../model/login');
const cadastro = require('../model/cadastro');
const categorias = require('../model/categorias');
const protocolos = require('../model/protocolos');

// Rota para o login
router.get('/', (req, res) =>{
    res.render('login');
})

router.post('/', login);

// Exemplo de rota protegida que verifica a sessão
router.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', { 
            id: req.session.user.id,
            nome: req.session.user.nome,
            tipoUsuario: req.session.user.tipoUsuario,
            usuario: req.session.user.usuario 
        });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

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

// Rota para a página de categorias
router.get('/categorias', (req, res) => {
    if (req.session.user) {
        res.render('categorias', { usuario: req.session.user.usuario });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

// Rota para buscar categorias via AJAX com validação de sessão
router.get('/api/categorias', (req, res) => {
    if (req.session.user) {
        categorias(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

router.get('/protocolos', (req, res) => {
    if (req.session.user) {
        res.render('protocolos', { usuario: req.session.user.usuario });
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});

router.get('/api/protocolos', (req, res) => {
    if (req.session.user) {
        protocolos(req, res);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});



//exporta o módulo
module.exports = router;