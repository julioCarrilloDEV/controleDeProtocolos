const db = require('./index');
const { DataTypes } = require('sequelize');

const Usuario = db.sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
    tipoUsuario: {
        type: DataTypes.STRING
    }
});

module.exports = Usuario;
