const router = require('express').Router();
const passport = require('passport');

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

// When logout, redirect to client
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_HOME_PAGE_URL);
});

// auth with google
router.get('/google', passport.authenticate('google', {scope: 'profile'}));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_HOME_PAGE_URL,
    failureRedirect: '/api/v1/auth/login/failed',
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.json({
      status: 'success',
      data: req.user,
    });
  }
);

module.exports = router;
