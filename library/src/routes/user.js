const express = require('express');
const isLoggedIn = require("../middleware/auth");
const passport = require("passport");
const router = express.Router();



router.get('/login', (req, res)=>
{
    res.render('user/login', {title: 'вход', message: req.flash('loginMessage'), flag: true})
})

router.get('/signup', async function (req, res) {
    res.render('user/signup', {title: 'регистрация', message: req.flash('signupMessage'), flag: true})
})

router.get('/me', isLoggedIn, async(req, res) => {
    let user = req.user
    if(user) res.render('user/profile', {user: user, title: 'профиль'});
    else res.status(404).json({errormessage: "user not found"})
})

router.post('/login',
    passport.authenticate(
        'local-login',
        {
            failureRedirect: '/user/login',
            failureMessage: true
        },
    ),
    function (req, res) {
        console.log("req.user: ", req.user)
        res.redirect('/user/me')
    })

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
    failureMessage: true
}), (req, res) => {
    return res.redirect('/user/login')
});

router.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) { return (err); }
        res.redirect('/user/login');
    });
});



module.exports = router;