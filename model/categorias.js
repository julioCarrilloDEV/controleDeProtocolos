const { sequelize } = require('./conn');

module.exports = (req, res) =>{

    if(!req.session.user) {
        return res.status(401).send('Você precisa fazer login para acessar esta página.');
    }

    const {id} = req.session.user;

    const query = `
        SELECT * FROM categoria INNER JOIN usuario_categoria ON idCategoria = categoriaID WHERE usuarioID = ${id};
    `;

    sequelize.query(query)
        .then(categorias => {
            res.json(categorias[0]);
        })
        .catch(err => {
            console.error('Erro ao buscar categorias:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        });

};

