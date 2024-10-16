const express = require('express');
//método do express de rota
const router = express.Router();
const authRoutes = require('./routes-auth');
const categoriasRoutes = require('./routes-categorias');
const protocolosRoutes = require('./routes-protocolos');
const favoritosRoutes = require('./routes-favoritos');
const perfilRoutes = require('./routes-perfil');
const adminRoutes = require('./routes-admin');


// rota protegida que verifica a sessão
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

router.use('/', authRoutes)
router.use('/', categoriasRoutes)
router.use('/', protocolosRoutes)
router.use('/', favoritosRoutes)
router.use('/', perfilRoutes)
router.use('/', adminRoutes)



//exporta o módulo
module.exports = router;