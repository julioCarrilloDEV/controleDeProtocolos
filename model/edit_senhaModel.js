const { sequelize } = require('./conn');

module.exports = async (req, res) => {
    const senhaAtual = req.body.senhaAtual;
    const novaSenha = req.body.novaSenha;
    const confirmarSenha = req.body.confirmarSenha;
    const id = req.session.user.id;

    try {
        // Buscar a senha atual do banco de dados
        const queryBuscarSenha = `
            SELECT senha
            FROM usuario
            WHERE id = ${id};
        `;

        const result = await sequelize.query(queryBuscarSenha, { type: sequelize.QueryTypes.SELECT });
        console.log('Resultado da consulta:', result);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const senhaUsuario = result[0].senha;
        console.log('Senha usuario:', senhaUsuario);

        // Verificar se a senha atual está correta
        if (senhaAtual !== senhaUsuario) {
            return res.status(400).json({ error: 'Senha atual incorreta' });
        }

        // Verificar se a nova senha coincide com a confirmação
        if (novaSenha !== confirmarSenha) {
            return res.status(400).json({ error: 'A nova senha e a confirmação não coincidem' });
        }

        // Atualizar a senha no banco de dados
        const queryAtualizarSenha = `
            UPDATE usuario
            SET senha = '${novaSenha}'
            WHERE id = ${id};
        `;

        await sequelize.query(queryAtualizarSenha);
        console.log('Senha atualizada com sucesso'+ novaSenha);
        // Atualizar a sessão com a nova senha
        req.session.user.senha = novaSenha;

        console.log('Sessão após a atualização:', req.session);
        res.redirect('/perfil');
    } catch (err) {
        console.error('Erro ao atualizar senha:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}