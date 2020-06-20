const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: '876679267917-ujp8psb0f9d2i21ba7m5p0s639cnc333.apps.googleusercontent.com',
        clientSecret: 'Ej1KwmsZno7ucpVgDcE1ZH_Z',
        callbackURL: "http://localhost:8000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));


// passport.use(new LinkedInStrategy({
//         clientID: LINKEDIN_KEY,
//         clientSecret: LINKEDIN_SECRET,
//         callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
//         scope: ['r_emailaddress', 'r_basicprofile'],
//       }, function(accessToken, refreshToken, profile, done) {
//         // asynchronous verification, for effect...
//         process.nextTick(function () {
//           // To keep the example simple, the user's LinkedIn profile is returned to
//           // represent the logged-in user. In a typical application, you would want
//           // to associate the LinkedIn account with a user record in your database,
//           // and return that user instead.
//           return done(null, profile);
//         });
//       }));