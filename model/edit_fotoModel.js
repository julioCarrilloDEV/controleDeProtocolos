const {sequelize} = require('./conn');


module.exports = (req, res) => {
    const userId = req.session.user.id;
    const foto = req.file.filename;

    const query = `
        UPDATE usuario
        SET foto = '${foto}'
        WHERE id = ${userId};
    `;

    sequelize.query(query)
        .then(() => {
            req.session.user.foto = foto; // Atualizar a sessão com a nova foto
            res.redirect('/perfil');
        })
        .catch(err => {
            console.error('Erro ao atualizar foto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
}