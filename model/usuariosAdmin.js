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
    },
    getUsuariosEdit: (req,res) => {
        const id = req.params.id;
        const query = `
            SELECT * FROM usuario WHERE id = ${id};
        `;
        sequelize.query(query)
        .then(result => {
            res.json(result[0][0]);
        })
        .catch(err => {
            console.error('Erro ao buscar os usuários', err);
            res.status(500).send('Erro ao buscar usuários');
        });
    },
    editUsuario: (req, res) => {
        const { id, nome, usuario, email, tipoUsuario} = req.body;
        const query = `
            UPDATE usuario
            SET nome = '${nome}', usuario = '${usuario}', email = '${email}', tipoUsuario = '${tipoUsuario}'
            WHERE id = ${id};
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/usuarios?status=successEditUser');
            })
            .catch(err => {
                console.error('Erro ao editar usuário:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
            });
    },
    deleteUsuario: (req,res) => {
        const id = req.body.id;
        const query = `
            DELETE FROM usuario WHERE id = ${id};
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/usuarios?status=successDeleteUser');
            })
            .catch(err => {
                console.error('Erro ao deletar usuário:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
            });
    }
}