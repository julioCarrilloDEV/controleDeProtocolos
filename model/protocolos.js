const { sequelize } = require('./conn');

module.exports = {
   buscarProtocolos: async () => {
    try {
        const query = `SELECT protocolo.*, categoria.nomeCategoria FROM protocolo INNER JOIN categoria ON categoriaID = idCategoria;`;

        const [protocolos] = await sequelize.query(query);
        return protocolos;
    } catch (error){
        throw new Error('Erro ao buscar protocolos: '+ error.message); 
    }
   }
};