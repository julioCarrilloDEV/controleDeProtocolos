const express = require('express');
const router = express.Router();
const categoriasAdmin = require('../model/categoriasAdmin');
const authMiddleware = require('./authMiddleware');

router.get('/admin/categorias', authMiddleware, (req, res) => {
    res.render('admin/adminCategorias');
});

router.get('/api/admin/categorias', authMiddleware, categoriasAdmin.getCategorias);

router.post('/admin/categorias', authMiddleware, categoriasAdmin.addCategoria);
router.post('/admin/edit/categorias', authMiddleware, categoriasAdmin.editCategoria);
router.post('/admin/delete/categorias', authMiddleware, categoriasAdmin.deleteCategoria);


module.exports = router;