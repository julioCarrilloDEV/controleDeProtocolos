const express = require('express');
const router = express.Router();
const protocolos = require('../model/protocolos');
const upload = require('../multerConfig');
const protocolosFavoritos = require('../model/protocolosFavoritos');
const favoritarProtocolos = require('../model/favoritarProtocolos');
const desfavoritarProtocolos = require('../model/desfavoritarProtocolos');
const anexoProtocolo = require('../model/anexoProtocolo');

// Rota para a página de protocolos
router.get('/protocolos', (req, res) => {
    if (req.session.user) {
        res.render('protocolos', { usuario: req.session.user.usuario });
    } else {
        res.redirect('/?message=disconnect');
    }
});

// Rota para buscar protocolos via AJAX com validação de sessão
router.get('/api/protocolos', (req, res) => {
    if (req.session.user) {
        protocolos(req, res);
    } else {
        res.redirect('/?message=disconnect');
    }
});

router.get('/api/protocolos/protocolosFavoritos', (req, res) => {
    if (req.session.user) {
        protocolosFavoritos(req, res);
    } else {
        res.redirect('/?message=disconnect');
    }
});

router.post('/api/protocolos/favoritar', (req, res) => {
    if (req.session.user) {
        favoritarProtocolos(req, res);
    } else {
        res.redirect('/?message=disconnect');
    }
});

router.post('/api/protocolos/desfavoritar', (req, res) => {
    if (req.session.user) {
        desfavoritarProtocolos(req, res);
    } else {
        res.redirect('/?message=disconnect');
    }
});

router.post('/api/protocolos/anexo', upload.single('anexo'), (req, res) => {
    anexoProtocolo(req, res);
});

module.exports = router;