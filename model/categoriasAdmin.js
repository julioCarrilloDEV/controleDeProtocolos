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
                res.redirect('/admin/categorias?status=successAdd');
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
    }  
}