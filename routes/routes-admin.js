const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const categoriasAdmin = require('../model/categoriasAdmin');
const protocolosAdmin = require('../model/protocolosAdmin');
const authMiddleware = require('./authMiddleware');

router.get('/admin/categorias', authMiddleware, (req, res) => {
    res.render('admin/adminCategorias');
});
router.get('/api/admin/categorias', authMiddleware, categoriasAdmin.getCategorias);
router.post('/admin/categorias', authMiddleware, categoriasAdmin.addCategoria);
router.post('/admin/edit/categorias', authMiddleware, categoriasAdmin.editCategoria);
router.post('/admin/delete/categorias', authMiddleware, categoriasAdmin.deleteCategoria);
router.post('/api/admin/categorias/protocolos/:idCategoria', authMiddleware, categoriasAdmin.associateProtocolos);




router.get('/admin/protocolos', authMiddleware, (req, res) => {
    res.render('admin/adminProtocolos');
});
router.get('/api/admin/protocolos', authMiddleware, protocolosAdmin.getProtocolos);
router.post('/admin/protocolos', authMiddleware, protocolosAdmin.addProtocolo);
router.post('/admin/protocolos/upload', authMiddleware, upload.single('anexo'), protocolosAdmin.uploadProtocolo);

module.exports = router;