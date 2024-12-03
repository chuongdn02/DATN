const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/auth/google/success?token=${req.user.token}`);
  }
);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/auth/facebook/success?token=${req.user.token}`);
  }
);

module.exports = router;
