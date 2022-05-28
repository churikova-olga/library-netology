
const User = require('./models/User')
const bcrypt = require('bcrypt-nodejs');

const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById({_id: id}, function (err, user) {
            if (err) { return done(err) }
            done(null, user)
        })
    })
    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
    function  (req, email, password, done) {

            User.findOne({email: email}, async function (err, user) {

                if (err) { return done(err) }
                if (!user) { return done(null, false, req.flash('loginMessage', 'Неправильный email или пароль')) }

                if (!bcrypt.compareSync(password, user.password)) { return done(null, false, req.flash('loginMessage', 'Неправильный пароль')) }

                return done(null, user)
            })
    }))

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
    function  (req, email, password, done){
        console.log(req.body)
        User.findOne({email: email}, async function (err, user) {
            if (err) { return done(err) }
            if(user){return done(null, false, req.flash('signupMessage', 'Такой email уже существует'))} //такой email же есть
            else{
                const {firstName, lastName, email} = req.body;
                const password = bcrypt.hashSync(req.body.password, null, null)
                const newUser = new User({firstName, lastName, email, password});

                try {
                    await newUser.save();
                    return done(null, newUser);
                } catch (e) {
                    console.error(e);
                    return done(null, false);
                }
            }
        })
    }))


}


