const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const userId = req.session.user.id;
    const protocoloId = req.body.protocoloId;

    const query = `
        DELETE FROM favoritos
        WHERE usuario_id = ${userId} AND protocolo_id = ${protocoloId};
    `;

    sequelize.query(query)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.error('Erro ao remover favorito:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};