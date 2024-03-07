const db = require('./index');
const { DataTypes } = require('sequelize');
const Categoria = require('./categoria')

const Protocolo = db.sequelize.define('protocolo', {
    idProtocolo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descricao: {
        type: DataTypes.STRING
    },
    anexo: {
        type: DataTypes.STRING
    },
    categoriaID: {
        type: DataTypes.INTEGER,
        refereces:{
            model: Categoria,
            key: 'idCategoria'
        }
    }
});

// Definindo a associação entre Protocolo e Categoria
Protocolo.belongsTo(Categoria, { foreignKey: 'categoriaID', as: 'categoria' });

module.exports = Protocolo;