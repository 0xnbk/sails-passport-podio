var passport = require('passport')
    , PodioStrategy = require('passport-podio').Strategy;



var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        User.findOne({uid: profile.id}).done(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    provider: profile.provider,
                    uid: profile.id,
                    name: profile.displayName
                }).done(function (err, user) {
                        return done(err, user);
                    });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).done(function (err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            passport.use(new PodioStrategy({
                    clientID: "PODIO_CLIENT_ID",
                    clientSecret: "PODIO_CLIENT_SECRET",
                    callbackURL: "http://localhost:1337/auth/podio/callback"
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};