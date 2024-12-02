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
    addUsuario: async (req,res) => {
        const { nome, usuario, email, tipoUsuario, senha } = req.body;

        // Validar que 'usuario' não contém espaços
        if (/\s/.test(usuario)) {
            return res.redirect('/admin/usuarios?status=errorUserWithSpaces');
        }

        try {
            // Verificar se o nome de usuário já existe
            const [existingUsers] = await sequelize.query(`
                SELECT * FROM usuario WHERE usuario = '${usuario}';
            `);

            if (existingUsers.length > 0) {
                // Nome de usuário já existente
                return res.redirect('/admin/usuarios?status=errorUserExists');
            }

            // Query SQL para inserir um novo usuário
            const query = `
                INSERT INTO usuario (nome, usuario, email, senha, tipoUsuario)
                VALUES ('${nome}', '${usuario}','${email}', '${senha}', '${tipoUsuario}');
            `;

            // Executa a query no banco de dados
            await sequelize.query(query);

            res.redirect('/admin/usuarios?status=successAddUser');
        } catch (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
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
    },
    getUsuariosCategorias: (req, res) => {
        const id = req.params.id;
        const query = `
            SELECT * FROM categoria
            JOIN usuario_categoria ON categoria.idCategoria = usuario_categoria.categoriaID
            WHERE usuario_categoria.usuarioID = ${id};
        `;
        sequelize.query(query)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                console.error('Erro ao buscar categorias do usuário', err);
                res.status(500).send('Erro ao buscar categorias do usuário');
            });
    },
    associateUsuariosCategorias: (req, res) => {
        const idUsuario = req.params.id;
        const categoriasIds = req.body.categoriasIds;
    
        // Atualizar categorias para associar ao usuário
        const updateQueries = categoriasIds.map(idCategoria => `
            INSERT INTO usuario_categoria (usuarioID, categoriaID)
            VALUES (${idUsuario}, ${idCategoria})
            ON DUPLICATE KEY UPDATE categoriaID = categoriaID;
        `);
    
        // Atualizar categorias para desassociar do usuário
        const desassociateQuery = `
            DELETE FROM usuario_categoria
            WHERE usuarioID = ${idUsuario}
            AND categoriaID NOT IN (${categoriasIds.join(', ')});
        `;
    
        Promise.all(updateQueries.map(query => sequelize.query(query)))
            .then(() => sequelize.query(desassociateQuery))
            .then(() => {
                res.status(200).send('Associações atualizadas com sucesso');
            })
            .catch(err => {
                console.error('Erro ao associar categorias ao usuário:', err);
                res.status(500).send('Erro ao associar categorias ao usuário');
            });
    },
    getUsuariosProtocolos: (req, res) => {
        const id = req.params.id;
        const query = `
            SELECT * FROM protocolo
            JOIN usuario_protocolo ON protocolo.idProtocolo = usuario_protocolo.protocoloID
            WHERE usuario_protocolo.usuarioID = ${id};
        `;
        sequelize.query(query)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                console.error('Erro ao buscar categorias do usuário', err);
                res.status(500).send('Erro ao buscar categorias do usuário');
            });
    },
    associateUsuariosProtocolos: (req, res) => {
        const idUsuario = req.params.id;
        const protocolosIds = req.body.protocolosIds;
    
        // Atualizar protocolos para associar ao usuário
        const updateQueries = protocolosIds.map(idProtocolo => `
            INSERT INTO usuario_protocolo (usuarioID, protocoloID)
            VALUES (${idUsuario}, ${idProtocolo})
            ON DUPLICATE KEY UPDATE protocoloID = protocoloID;
        `);
    
        // Atualizar protocolos para desassociar do usuário
        const desassociateQuery = `
            DELETE FROM usuario_protocolo
            WHERE usuarioID = ${idUsuario}
            AND protocoloID NOT IN (${protocolosIds.join(', ')});
        `;
    
        Promise.all(updateQueries.map(query => sequelize.query(query)))
            .then(() => sequelize.query(desassociateQuery))
            .then(() => {
                res.status(200).send('Associações atualizadas com sucesso');
            })
            .catch(err => {
                console.error('Erro ao associar protocolos ao usuário:', err);
                res.status(500).send('Erro ao associar protocolos ao usuário');
            });
    },
}