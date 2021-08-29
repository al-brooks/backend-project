// dotenv
require('dotenv').config();
// express
global.express = require('express');
const app = express();
//session
global.session = require('express-session');
// mustache
const mustacheExpress = require('mustache-express');
// authenticate
global.authenticate = require('./authentication/authenticate');
// database
const pgp = require('pg-promise')();
const connectionString = process.env.DB_CONNECT;
global.db = pgp(connectionString);
global.bcrypt = require('bcryptjs');
// PORT
const PORT = process.env.PORT;
// create router variables
const usersRouter = require('./routers/users');
// set express to parse body
app.use(express.urlencoded({ extended: true }));

// set session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: true
  })
);

// set routers
app.use('/users', usersRouter);

// Set static resources - for css styling and async js requests
app.use(express.static('static-resources'));

// set mustache for template engine
app.engine('mustache', mustacheExpress());
app.set('views', './templates');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Server is running...');
});
