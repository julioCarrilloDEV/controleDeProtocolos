const { sequelize } = require('./conn');
const { error } = require('console');

module.exports = (req, res) => {
    const { nome, usuario, senha } = req.body;

    // Query SQL para inserir um novo usuário
    const query = `
        INSERT INTO usuario (nome, usuario, senha, tipoUsuario)
        VALUES ('${nome}', '${usuario}', '${senha}', 'comum');
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(() => {
            console.log('Usuário inserido com sucesso');
            // Retornar a URL de redirecionamento
            res.redirect('/login');
        })
        .catch(err => {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};
