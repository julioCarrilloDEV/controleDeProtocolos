const { sequelize } = require('./conn');

module.exports = (req, res) => {
    const usuario = req.session.usuario;
    
    // Query SQL para buscar usuário correspondente
    const query = `
        SELECT nome, tipoUsuario FROM usuario
        WHERE usuario = '${usuario}';
    `;

    // Executa a query no banco de dados
    sequelize.query(query)
        .then(result => {
            console.log(result)
            const tipoUsuario = result[0][0].tipoUsuario;
            const nome = result[0][0].nome;
            const dados = {
                nome: nome,
                tipoUsuario: tipoUsuario     
            }
            res.json(dados)
        })
        .catch(error => {
            res.status(500).send({ error: 'Erro interno do servidor' });
        });

};