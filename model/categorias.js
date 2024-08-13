const { sequelize } = require('./conn');

module.exports = {
    buscarCategorias: async () => {
        try {
            const query = `SELECT * FROM categoria`;
            // Pausa a execução da função até que a consulta ao banco de dados seja concluída para então atribuir o resultado à variável
            const [categorias] = await sequelize.query(query);
            return categorias;  // Retorna o array de categorias
        } catch (error) {
            throw new Error('Erro ao buscar categorias: ' + error.message);
        }
    }
};
