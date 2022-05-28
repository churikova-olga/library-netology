function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the page
    res.redirect('/user/login');
}

module.exports = isLoggedIn