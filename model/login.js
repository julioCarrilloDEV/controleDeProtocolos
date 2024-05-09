const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    
    // Query SQL para buscar usuário correspondente
    const query = `
        SELECT usuario, senha FROM usuario
        WHERE usuario = '${usuario}' AND senha = '${senha}';
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(result => {
            if (result.length > 0) {
                // Usuário encontrado
                // Envie uma resposta de sucesso
                res.status(200).send({ user: usuario });
            } else {
                // Envie uma resposta de erro
                res.status(401).send({ error: 'Usuário ou senha incorretos.' });
            }
        })
        .catch(error => {
            console.error('Erro ao realizar login:', error);
            res.status(500).send({ error: 'Erro interno do servidor' });
        });

};