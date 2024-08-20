let express = require('express');
//método do express de rota
let router = express.Router();
let createUsuario = require('../model/createUsuario');
let realizarLogin = require('../model/login');
const categoriaModel = require('../model/categorias');  // Aponta para o arquivo combinado
const protocoloModel = require('../model/protocolos');
const perfilModel = require('../model/perfil');


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


router.get('/categorias', async (req, res) => {
    try {
        // Chama a função buscarCategorias do modelo para obter as categorias
        const categorias = await categoriaModel.buscarCategorias();
        res.render('categorias', { categorias });
    } catch (error) {
        res.status(500).send('Erro ao carregar categorias');
    }
});

router.get('/protocolos', async (req, res) => {
    try{
        const protocolos = await protocoloModel.buscarProtocolos();
        res.render('protocolos', {protocolos});
    } catch(e){
        res.status(500).send('Erro ao carregar os protocolos');
    }
})

router.post('/perfil', async (req,res) => {
    const {nome, tipo, usuario} = req.body;
    try{
        const userInfo = await perfilModel.getUserInfo(nome, tipo, usuario);
        res.send(userInfo)
    }catch(e){
        res.status(500).send('Erro ao buscar informações do perfil.');
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