const {sequelize} = require('./conn');

module.exports = (req, res) => {
    const senhaAtual = req.body.senhaAtual;
    const novaSenha = req.body.novaSenha;
    const confirmarSenha = req.body.confirmarSenha;
    const senhaUsuario = req.session.user.senha;
    console.log('Senha usuario:', senhaUsuario);
    const id = req.session.user.id;

    // Verificar se a senha atual está correta
    if (senhaAtual !== senhaUsuario) {
        return res.status(400).json({ error: 'Senha atual incorreta' });
    }

    // Verificar se a nova senha coincide com a confirmação
    if (novaSenha !== confirmarSenha) {
        return res.status(400).json({ error: 'A nova senha e a confirmação não coincidem' });
    }

    // Atualizar a senha no banco de dados
    const query = `
        UPDATE usuario
        SET senha = '${novaSenha}'
        WHERE id = ${id};
    `;

    sequelize.query(query)
        .then(() => {
            // Atualizar a sessão com a nova senha
            req.session.user.senha = novaSenha;

            console.log('Sessão após a atualização:', req.session);
            res.redirect('/perfil');
        })
        .catch(err => {
            console.error('Erro ao atualizar senha:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
}