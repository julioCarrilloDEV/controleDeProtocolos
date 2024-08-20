const { sequelize } = require('./conn');

const getUserInfo = async (nome, tipo, usuario) => {
    const query = `
        SELECT * FROM usuarios
        WHERE nome = :nome AND tipo = :tipo AND usuario = :usuario
    `;
    const [results] = await sequelize.query(query, {
        replacements: { nome, tipo, usuario },
    });
    return results;
}

module.exports = {
    getUserInfo
};