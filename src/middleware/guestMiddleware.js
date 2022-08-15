function guestMidedleware(req, res, next) {
    if(req.session.userLoggued){
        return res.redirect('/users/profile');
    }
    next();
}

module.exports = guestMidedleware;