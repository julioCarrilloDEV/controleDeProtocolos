const {sequelize} = require('./conn');

module.exports = {
    getProtocolos: (req,res) => {
        const query = `
            SELECT * FROM protocolo
            LEFT JOIN categoria ON categoriaID = idCategoria;
        `;

        sequelize.query(query)
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.error('Erro ao buscar os protocolos', err);
            res.status(500).send('Erro ao buscar protocoolos');
        });
    }
}