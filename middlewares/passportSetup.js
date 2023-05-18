const User = require('../models/User');
const {nanoid} = require('nanoid');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          done(null, existingUser);
        } else {
          const username = 'user-' + nanoid(5);
          console.log(username);
          const newUser = new User({
            username,
            email: profile.emails[0].value,
          });

          await User.create(newUser);
          done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
