const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const { nome, usuario, email, senha, conf_senha} = req.body;
    const tipoUsuario = 'comum';
    if (senha !== conf_senha) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }
    // Query SQL para inserir um novo usuário
    const query = `
        INSERT INTO usuario (nome, usuario, email, senha, tipoUsuario)
        VALUES ('${nome}', '${usuario}','${email}', '${senha}', '${tipoUsuario}');
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(() => {
            console.log('Usuário inserido com sucesso');
            // Retornar a URL de redirecionamento
            res.redirect('/');
        })
        .catch(err => {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
};
