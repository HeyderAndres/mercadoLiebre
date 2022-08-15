const user = require('../models/user');
function userLogged(req, res, next) {

    res.locals.isLoggued = false;

    let emailInCookie = req.cookies.userLoggued;
    let userFromCookie = user.getOneUserByField("email", emailInCookie);
    if (userFromCookie) {
        req.session.userLoggued = userFromCookie;
    } 

    if (req.session.userLoggued) {
        res.locals.isLoggued = true;
        res.locals.userLoggued = req.session.userLoggued;
    }

    next();
}
    
module.exports = userLogged;