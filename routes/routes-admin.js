const express = require('express');
const router = express.Router();
const categoriasAdmin = require('../model/categoriasAdmin');
const authMiddleware = require('./authMiddleware');

router.get('/admin/categorias', authMiddleware, (req, res) => {
    res.render('admin/adminCategorias');
});

router.get('/api/admin/categorias', authMiddleware, categoriasAdmin.getCategorias);

module.exports = router;