const { sequelize } = require('./conn');

module.exports = (req, res) => {

    const userId = req.session.user.id;

    const query = `
        SELECT protocolo_id
        FROM favoritos
        WHERE usuario_id = ${userId};
    `;

    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then(result => {
            const protocolosFavoritos = result.map(fav => fav.protocolo_id);
            res.json(protocolosFavoritos);
        })
        .catch(err => {
            console.error('Erro ao obter protocolos favoritos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};