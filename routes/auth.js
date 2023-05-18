const router = require('express').Router();
const passport = require('passport');
const {StatusCodes} = require('http-status-codes');

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: true,
      message: 'Not Authenticated',
    });
    //res.redirect(process.env.CLIENT_HOME_PAGE_URL);
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(StatusCodes.UNAUTHORIZED).json({
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
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_HOME_PAGE_URL}/login/success`,
    failureRedirect: '/api/v1/auth/login/failed',
  })
);

module.exports = router;
