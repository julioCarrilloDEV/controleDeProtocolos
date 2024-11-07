const express = require('express');
const router = express.Router();
const upload = require('../multerConfig');
const categoriasAdmin = require('../model/categoriasAdmin');
const protocolosAdmin = require('../model/protocolosAdmin');
const usuariosAdmin = require('../model/usuariosAdmin');
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
router.post('/admin/protocolos/edit', authMiddleware, protocolosAdmin.editProtocolo);
router.post('/admin/protocolos/delete', authMiddleware, protocolosAdmin.deleteProtocolo);

router.get('/admin/usuarios', authMiddleware, (req, res) => {
    res.render('admin/adminUsuarios');
})
router.get('/api/admin/usuarios', authMiddleware, usuariosAdmin.getUsuarios);
router.get('/api/admin/usuarios/:id', authMiddleware, usuariosAdmin.getUsuariosEdit);
router.post('/admin/usuarios', authMiddleware, usuariosAdmin.addUsuario);
router.post('/admin/usuarios/edit', authMiddleware, usuariosAdmin.editUsuario);
router.post('/admin/usuarios/delete', authMiddleware, usuariosAdmin.deleteUsuario);
module.exports = router;