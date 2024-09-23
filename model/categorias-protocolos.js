const { sequelize } = require('./conn');

module.exports = (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Você precisa fazer login para acessar esta página.');
    }
    console.log('ISSO AQUI ESTÁ SENDO CHAMADO?? idCategoria:', req.params.idCategoria); // Corrigido para acessar diretamente req.params
    const idCategoria = req.params.idCategoria; // Corrigido para acessar diretamente req.params

    const query = `
        SELECT * FROM protocolo
        WHERE categoriaID = :idCategoria;
    `;

    sequelize.query(query, {
        replacements: { idCategoria: idCategoria },
        type: sequelize.QueryTypes.SELECT
    })
    .then(protocolos => {
        res.json(protocolos);
    })
    .catch(err => {
        console.error('Erro ao buscar protocolos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    });
};