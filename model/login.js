const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    
    // Query SQL para buscar usuário correspondente
    const query = `
        SELECT usuario, nome, tipoUsuario, senha FROM usuario
        WHERE usuario = '${usuario}' AND senha = '${senha}';
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(result => {
            /* o Sequelize retorna os resultados em um formato específico. 
            Esse formato é um array, onde o primeiro elemento (result[0]) é a matriz contendo os resultados da consulta, 
            e o segundo elemento (result[1]) é um objeto com metadados sobre a execução da consulta. */
            if (result[0].length > 0) {
                const user = result[0][0]; // Assume que result[0] tem os dados dos usuários
                // Define as informações de sessão
                req.session.usuario = {
                    nomeUsuario: user.nome,
                    tipo_usuario: user.tipoUsuario,
                    usuario: user.usuario
                };
                res.status(200).send({ message: 'Login bem-sucedido' })
            } else {
                // Envie uma resposta de erro
                res.status(401).send({ error: 'Usuário ou senha incorretos.' });
            }
        })
        .catch(error => {
            console.error('Erro ao realizar login modelo:', error);
            res.status(500).send({ error: 'Erro interno do servidor' });
        });

};