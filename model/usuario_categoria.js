const db = require('./conn');
const { DataTypes } = require('sequelize');
const Categoria = require('./categoria');
const Usuario = require('./usuario');

const UsuarioCategoria = db.sequelize.define('protocolo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarioID: {
        type: DataTypes.INTEGER,
        references:{
            model: Usuario,
            key: 'id'
        }
    },
    categoriaID: {
        type: DataTypes.INTEGER,
        references:{
            model: Categoria,
            key: 'idCategoria'
        }
    }
});

// Definindo a associação entre UsuarioCategoria e Usuario
UsuarioCategoria.belongsTo(Usuario, { foreignKey: 'usuarioID', as: 'usuario'});
// Definindo a associação entre UsuarioCategoria e Categoria
UsuarioCategoria.belongsTo(Categoria, { foreignKey: 'categoriaID', as: 'categoria' });

module.exports = UsuarioCategoria;