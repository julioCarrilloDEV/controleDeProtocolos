const {sequelize} = require('./conn');

module.exports = {
    getCategorias: (req, res) => {
        const query = `
            SELECT * FROM categoria;
        `;
        sequelize.query(query)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                console.error('Erro ao buscar categorias:', err);
                res.status(500).send('Erro ao buscar categorias');
            });
        },
    addCategoria: (req, res) => {
        const nomeCategoria = req.body.nomeCategoria;

        const query = `
            INSERT INTO categoria (nomeCategoria)
            VALUES ('${nomeCategoria}');
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/categorias?status=successCatAdd');
            })
            .catch(err => {
                console.error('Erro ao adicionar categoria:', err);
                res.status(500).send('Erro ao adicionar categoria');
            });
    },
    editCategoria: (req, res) => {
        const idCategoria = req.body.idCategoria;
        const nomeCategoria = req.body.nomeCategoria;

        const query = `
            UPDATE categoria
            SET nomeCategoria = '${nomeCategoria}'
            WHERE idCategoria = ${idCategoria};
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/categorias?status=successCatEdit');
            })
            .catch(err => {
                console.error('Erro ao editar categoria:', err);
                res.status(500).send('Erro ao editar categoria');
            });
    }, 
    deleteCategoria: (req, res) => {
        const idCategoria = req.body.idCategoria;
        
         // Query to delete from usuario_categoria
        const deleteUsuarioCategoriaQuery = `
            DELETE FROM usuario_categoria
            WHERE categoriaID = ${idCategoria};
        `;

        // Query to delete from categoria
        const deleteCategoriaQuery = `
            DELETE FROM categoria
            WHERE idCategoria = ${idCategoria};
        `;

        // Execute the queries in sequence
        sequelize.query(deleteUsuarioCategoriaQuery)
            .then(() => {
                return sequelize.query(deleteCategoriaQuery);
            })
            .then(() => {
                res.redirect('/admin/categorias?status=successCatDelete');
            })
            .catch(err => {
                console.error('Erro ao deletar categoria:', err);
                res.status(500).send('Erro ao deletar categoria');
            });
    },
    getProtocolos: (req, res) => {
        const query = `
            SELECT * FROM protocolo;
        `;
        sequelize.query(query)
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                console.error('Erro ao buscar protocolos:', err);
                res.status(500).send('Erro ao buscar protocolos');
            });
    },
    associateProtocolos: (req, res) => {
        const idCategoria = req.params.idCategoria; // Obtém o ID da categoria a partir dos parâmetros da requisição
        const protocolosIds = req.body.protocolosIds || []; // Garante que protocolosIds seja sempre um array, mesmo se não for enviado no formulário

        // Atualizar protocolos para associar à categoria
        // Percorre o array protocolosIds e cria uma consulta de atualização para cada protocolo
        const updateQueries = protocolosIds.map(idProtocolo => `
            UPDATE protocolo
            SET categoriaID = ${idCategoria}
            WHERE idProtocolo = ${idProtocolo};
        `);

        // Atualizar protocolos para desassociar da categoria
        let desassociateQuery = '';
        if (protocolosIds.length > 0) {
            // Se o array protocolosIds não estiver vazio, remove a associação apenas dos protocolos que não estão no array
            desassociateQuery = `
                UPDATE protocolo
                SET categoriaID = NULL
                WHERE categoriaID = ${idCategoria}
                AND idProtocolo NOT IN (${protocolosIds.join(', ')});
            `;
        } else {
            // Se o array estiver vazio, desassocia todos os protocolos da categoria
            desassociateQuery = `
                UPDATE protocolo
                SET categoriaID = NULL
                WHERE categoriaID = ${idCategoria};
            `;
        }
        // Executa todas as queries de associação em paralelo e, em seguida, a query de desassociação
        Promise.all(updateQueries.map(query => sequelize.query(query))) // Resolve todas as queries geradas para associar protocolos
            .then(() => sequelize.query(desassociateQuery)) // Após associar, executa a query de desassociação
            .then(() => {
                // Redireciona para a página de categorias com uma mensagem de sucesso
                res.redirect('/admin/categorias?status=successCatAssociate');
            })
            .catch(err => {
                // Em caso de erro, exibe no console e retorna uma mensagem de erro ao cliente
                console.error('Erro ao associar protocolos à categoria:', err);
                res.status(500).send('Erro ao associar protocolos à categoria');
            });
    }
}