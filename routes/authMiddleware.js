module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.tipoUsuario === 'admin') {
        next();
    } else {
        res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
    }
}