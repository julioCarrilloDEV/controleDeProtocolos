const {sequelize} = require('./conn');

module.exports = {
    getCategorias: (req, res) => {
        const query = `
            SELECT * FROM categoria;
        `;
        sequelize.query(query)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                console.error('Erro ao buscar categorias:', err);
                res.status(500).send('Erro ao buscar categorias');
            });
        }
}