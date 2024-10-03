const {sequelize} = require('./conn');


module.exports = (req, res) => {
    const email = req.body.email;
    const nome = req.body.nome;
    const id = req.session.user.id;

    console.log('Sessão antes da atualização:', req.session);

    const query = `
        UPDATE usuario
        SET email = '${email}', nome = '${nome}'
        WHERE id = ${id};
    `;

    sequelize.query(query)
        .then(() => {
            // Atualizar a sessão com os novos valores
            req.session.user.email = email;
            req.session.user.nome = nome;

            console.log('Sessão após a atualização:', req.session);
            res.redirect('/perfil');
        })
        .catch(err => {
            console.error('Erro ao atualizar perfil:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
}