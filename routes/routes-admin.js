const express = require('express');
const router = express.Router();
const categorias = require('../model/categorias');
const authMiddleware = require('./authMiddleware');

router.get('/admin/categorias', authMiddleware, (req, res) => {
    res.render('admin/adminCategorias');
});


module.exports = router;