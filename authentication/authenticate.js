const authenticate = (req, res, next) => {
  if (req.session) {
    if (req.session.user_id) {
      res.locals.isAuthenticated = true;
      next();
    } else {
      res.render('index', { message: 'Log in or Sign up to continue!' });
    }
  } else res.render('index', { message: 'Log in or Sign up to continue!' });
};

module.exports = authenticate;
