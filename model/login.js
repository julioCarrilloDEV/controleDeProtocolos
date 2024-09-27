const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    
    // Query SQL para buscar usuário correspondente
    const query = `
        SELECT id, usuario, email, nome, tipoUsuario, senha FROM usuario
        WHERE usuario = '${usuario}' AND senha = '${senha}';
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(result => {
            if (result[0].length > 0) {
                const user = result[0][0];
                    // Armazena os valores na sessão
                    req.session.user = {
                        id: user.id,
                        usuario: user.usuario,
                        nome: user.nome,
                        email: user.email,
                        tipoUsuario: user.tipoUsuario
                    };
                    
                    res.render('home', { 
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                        tipoUsuario: user.tipoUsuario,
                        usuario: user.usuario
                    });
            } else {
                res.status(401).send({ error: 'Usuário ou senha incorretos.' });
            }
        })
        .catch(error => {
            console.error('Erro ao realizar login modelo:', error);
            res.status(500).send({ error: 'Erro interno do servidor' });
        });
};
