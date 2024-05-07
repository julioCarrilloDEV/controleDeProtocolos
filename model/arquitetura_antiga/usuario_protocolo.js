const db = require('../conn');
const { DataTypes } = require('sequelize');
const Protocolo = require('./protocolo');
const Usuario = require('./usuario');

const UsuarioProtocolo = db.sequelize.define('protocolo', {
    id_usuarioProtocolo: {
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
    protocoloID: {
        type: DataTypes.INTEGER,
        references:{
            model: Protocolo,
            key: 'idProtocolo'
        }
    }
});

// Definindo a associação entre UsuarioCategoria e Usuario
UsuarioProtocolo.belongsTo(Usuario, { foreignKey: 'usuarioID', as: 'usuario'});
// Definindo a associação entre UsuarioCategoria e Protocolo
UsuarioProtocolo.belongsTo(Protocolo, { foreignKey: 'protocoloID', as: 'protocolo' });

module.exports = UsuarioProtocolo;