const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const userId = req.session.user.id;
    const protocoloId = req.body.protocoloId;

    const query = `
        INSERT INTO favoritos (usuario_id, protocolo_id)
        VALUES (${userId}, ${protocoloId});
    `;

    sequelize.query(query)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.error('Erro ao adicionar favorito:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};