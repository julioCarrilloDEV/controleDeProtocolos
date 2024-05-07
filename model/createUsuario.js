const { sequelize } = require('./conn');
const { error } = require('console');

module.exports = (req, res) => {
    const { usuario, senha } = req.body;

    // Query SQL para inserir um novo usuário
    const query = `
        INSERT INTO usuario (usuario, senha)
        VALUES ('${usuario}', '${senha}');
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(() => {
            console.log('Usuário inserido com sucesso');
            res.status(200).json({ message: 'Usuário inserido com sucesso' });
        })
        .catch(err => {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};
