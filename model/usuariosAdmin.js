const {sequelize} = require('./conn');

module.exports = {
    getUsuarios: (req,res) => {
        const query = `
            SELECT * FROM usuario;
        `;
        sequelize.query(query)
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.error('Erro ao buscar os usuários', err);
            res.status(500).send('Erro ao buscar usuários');
        });
    },
    addUsuario: (req,res) => {
        const { nome, usuario, email, tipoUsuario, senha} = req.body;
        
        // Query SQL para inserir um novo usuário
        const query = `
            INSERT INTO usuario (nome, usuario, email, senha, tipoUsuario)
            VALUES ('${nome}', '${usuario}','${email}', '${senha}', '${tipoUsuario}');
        `;

        // Executa a query no banco de dados
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/usuarios?status=successAddUser');

            })
            .catch(err => {
                console.error('Erro ao inserir usuário:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
            });
    }
}