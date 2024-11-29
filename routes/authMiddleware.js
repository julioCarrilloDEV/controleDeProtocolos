module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.tipoUsuario === 'admin') {
        next();
    } else {
        res.redirect('/?message=disconnect');
    }
}