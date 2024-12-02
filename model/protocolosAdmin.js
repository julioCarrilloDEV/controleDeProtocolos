const {sequelize} = require('./conn');

module.exports = {
    getProtocolos: (req,res) => {
        const query = `
            SELECT * FROM protocolo
            LEFT JOIN categoria ON categoriaID = idCategoria;
        `;

        sequelize.query(query)
        .then(result => {
            res.json(result[0]);
        })
        .catch(err => {
            console.error('Erro ao buscar os protocolos', err);
            res.status(500).send('Erro ao buscar protocoolos');
        });
    },
    addProtocolo: (req,res) => {
        const descricao = req.body.descricao;

        const query =` INSERT INTO protocolo (descricao) VALUES ('${descricao}');`;

        sequelize.query(query)
        .then(() => {
            res.redirect('/admin/protocolos?status=successAdd');
        })
        .catch(err => {
            console.error('Erro ao adicionar protocolo', err);
            res.status(500).send('Erro ao adicionar protocolo');
        })
    },
    uploadProtocolo:(req,res) => {
        const idProtocolo = req.body.idProtocolo;
        const anexo = req.file.filename;
        const query = `
            UPDATE protocolo
            SET anexo = '${anexo}'
            WHERE idProtocolo = ${idProtocolo};
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/protocolos?status=successUpload');
            })
            .catch(err => {
                console.error('Erro ao salvar arquivo de protocolo:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
            });
    },
    editProtocolo:(req, res) => {
        const idProtocolo = req.body.idProtocolo;
        const descricao = req.body.descricao;
        const query = `
            UPDATE protocolo
            SET descricao = '${descricao}'
            WHERE idProtocolo = ${idProtocolo};
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/protocolos?status=successEdit');
            })
            .catch(err => {
                console.error('Erro ao editar protocolo:', err);
                res.status(500).send('Erro ao editar protocolo');
            });
    },
    deleteProtocolo:(req,res) => {
        const idProtocolo = req.body.idProtocolo;
        const query = `
            DELETE FROM protocolo
            WHERE idProtocolo = ${idProtocolo};
        `;
        sequelize.query(query)
            .then(() => {
                res.redirect('/admin/protocolos?status=successDelete');
            })
            .catch(err => {
                console.error('Erro ao deletar protocolo:', err);
                res.status(500).send('Erro ao deletar protocolo');
            });
    }
}