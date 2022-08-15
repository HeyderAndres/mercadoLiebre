function authMiddleware(req, res, next) {
    if(!req.session.userLoggued){
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;