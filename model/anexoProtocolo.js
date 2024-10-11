const {sequelize} = require('./conn');


module.exports = (req, res) => {
    const protocoloId = req.body.protocoloId;
    const anexo = req.file.filename;
    const query = `
        UPDATE protocolo
        SET anexo = '${anexo}'
        WHERE idProtocolo = ${protocoloId};
    `;
    sequelize.query(query)
        .then(() => {
            res.json({ success: true, message: 'Arquivo de protocolo salvo com sucesso!' });
        })
        .catch(err => {
            console.error('Erro ao salvar arquivo de protocolo:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
}