let express = require('express');
//método do express de rota
const router = express.Router();
const login = require('../model/login');

// Rota para o login
router.get('/', (req, res) =>{
    res.render('login');
})

router.post('/', login);

// Exemplo de rota protegida que verifica a sessão
router.get('/home', (req, res) => {
    if (req.session.user) {
        res.send(`Bem-vindo, ${req.session.user.nome}!`);
    } else {
        res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
});
//exporta o módulo
module.exports = router;