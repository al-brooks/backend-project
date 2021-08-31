const { decodeBase64 } = require('bcryptjs');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/home', authenticate, (req, res) => {
  // can use similar for reviews and movie details
  res.render('homefeed', { user_id: req.session.user_id });
});

router.get('/:userid', authenticate, (req, res) => {
  const user_id = req.params.userid;

  db.one(
    'SELECT user_id, first_name, last_name, user_name, user_email FROM users WHERE user_id = $1',
    [user_id]
  )
    .then((user) => {
      res.render('useraccount', { user: user });
    })
    .catch((error) => {
      res.send('An Error Occurred');
    });
});

router.post('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.post('/login', (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;

  db.one(
    'SELECT user_id, user_name, user_password FROM users WHERE user_name = $1',
    [user_name]
  )
    .then((user) => {
      bcrypt.compare(
        user_password,
        user.user_password,
        function (error, result) {
          if (result) {
            if (req.session) {
              req.session.user_id = user.user_id;
              console.log(req.session.user_id);
            }
            res.redirect('/users/home');
          } else {
            res.render('login', {
              message: 'Incorrect Password, Please try again'
            });
          }
        }
      );
    })
    .catch((error) => {
      // user does not exist or incorrect username
      res.render('signup', {
        message: `There's no account associated with the Username you provided. Please sign up!`
      });
    });
});

router.post('/signup', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const user_email = req.body.user_email;
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;

  // check if user already exists:

  db.one(
    'SELECT user_id, user_name, user_password FROM users WHERE user_name = $1',
    [user_name]
  )
    .then((user) => {
      bcrypt.compare(
        user_password,
        user.user_password,
        function (error, result) {
          if (result) {
            // user has an account
            res.render('login', {
              message: 'You already have an account, please login'
            });
          } else {
            // incorrect password
            // user has an account
            res.render('login', {
              message: 'You already have an account, please login'
            });
          }
        }
      );
    })
    .catch((error) => {
      //user does not exist
      bcrypt.genSalt(10, function (error, salt) {
        if (!error) {
          bcrypt.hash(user_password, salt, function (error, hash) {
            if (!error) {
              db.none(
                'INSERT INTO users(first_name, last_name, user_email, user_name, user_password) VALUES ($1, $2, $3, $4, $5)',
                [first_name, last_name, user_email, user_name, hash]
              ).then(() => {
                console.log('User has been added to Database');
                db.one(
                  'SELECT user_id, user_name, user_password FROM users WHERE user_name = $1',
                  [user_name]
                ).then((user) => {
                  req.session.user_id = user.user_id;
                  res.redirect('/users/home');
                });
              });
            } else {
              res.send('An Error Occurred');
            }
          });
        } else {
          res.send('An Error Occurred');
        }
      });
    });
});

module.exports = router;
