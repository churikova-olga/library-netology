const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require("../../models/User");
const isLoggedIn = require('../../middleware/auth');


router.get('/me', isLoggedIn, async(req, res) => {
    let id = req.user._id
    console.log(id)
    const user = await User.find({_id: id}).select('-__v');
    if(user) res.json(user);
})

router.get('/login', (req, res)=>
{
    res.json({title:'вход', email: 'Введите email', password: 'Введите login'})
})

router.post('/login',
    passport.authenticate(
        'local-login',
        {
            failureRedirect: '/api/user/login',
            failureMessage: true
        },
    ),
    function (req, res) {
        console.log("req.user: ", req.user)
        res.redirect('/api/user/me')
    })

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/api/user/signup', // redirect back to the signup page if there is an error
    failureMessage: true
}), (req, res) => {
    return res.redirect('/api/user/login')
});

router.get('/signup', async function (req, res) {
    res.json({title:'регистрация', firstName: 'Введите имя', lastName: 'Введите фамилия',
        email: 'Введите email', password: 'Введите login'})
})

module.exports = router;
