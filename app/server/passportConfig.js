const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

export const localStrategy = new Local.Strategy(function(passport) {
  passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
          console.error("Error fetching user:", err);
          return done(err);
      }
      if (!user) {
          console.log("No user found with this email:", email);
          return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
              console.error("Error comparing passwords:", err);
              return done(err);
          }
          if (result) {
              console.log("Passwords match!");
              return done(null, user);
          } else {
              console.log("Passwords do NOT match!");
              return done(null, false);
          }
      });
  });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

});
