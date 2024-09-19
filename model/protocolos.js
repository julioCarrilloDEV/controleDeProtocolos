const { sequelize } = require('./conn');

module.exports = (req, res) => {

    if(!req.session.user) {
        return res.status(401).send('Você precisa fazer login para acessar esta página.');
    }

    const {id} = req.session.user;

    const query = `
        SELECT * FROM protocolo INNER JOIN usuario_protocolo ON idProtocolo = protocoloID INNER JOIN categoria ON categoriaID = idCategoria WHERE usuarioID = ${id};    `;

    sequelize.query(query)
        .then(protocolos => {
            res.json(protocolos[0]);
        })
        .catch(err => {
            console.error('Erro ao buscar protocolos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
   
};