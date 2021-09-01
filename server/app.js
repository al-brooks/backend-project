// dotenv
require('dotenv').config();
// express
global.express = require('express');
const app = express();
// fetch API
global.fetch = require('node-fetch');
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
const moviesRouter = require('./routers/movies');
const searchRouter = require('./routers/search');
const authenticate = require('./authentication/authenticate');
// Set static resources - for css styling and async js requests
app.use(express.static('static-resources'));

// set express to parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.locals.isAuthenticated = false;
  next();
});

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
app.use('/movies', authenticate, moviesRouter);
app.use('/search', searchRouter);

// set mustache for template engine
app.engine('mustache', mustacheExpress());
app.set('views', './templates');
app.set('view engine', 'mustache');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, () => {
  console.log('Server is running...');
});
