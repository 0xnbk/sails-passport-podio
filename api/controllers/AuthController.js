/**
 * AuthController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var passport = require('passport');

var AuthController = {

    index: function (req, res) {
        res.view();
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    'podio': function (req, res) {
        passport.authenticate('podio', { failureRedirect: '/login' },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.view('500');
                        return;
                    }

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },

    'podio/callback': function (req, res) {
        passport.authenticate('podio',
            function (req, res) {
                res.redirect('/');
            })(req, res);
    }


};
module.exports = AuthController;