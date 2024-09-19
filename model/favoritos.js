const {sequelize} = require('./conn');

module.exports = (req, res) => {
    if(!req.session.user) {
        return res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
    const {id} = req.session.user;

    const query = `
        SELECT * FROM protocolo INNER JOIN favoritos ON idProtocolo = protocolo_id WHERE usuario_id = ${id};
    `;

    sequelize.query(query)
        .then(favoritos => {
            res.json(favoritos[0]);
        })
        .catch(err => {
            console.error('Erro ao buscar favoritos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
}