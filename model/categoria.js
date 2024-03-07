const db = require('./index');
const { DataTypes } = require('sequelize');

const Categoria = db.sequelize.define('categoria', {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeCategoria: {
        type: DataTypes.STRING
    }
});

module.exports = Categoria;