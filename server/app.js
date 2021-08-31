// dotenv
require('dotenv').config();
// express
global.express = require('express');
const app = express();
// fetch API
const fetch = require('node-fetch');
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
app.use(express.json());

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

// working on Movie API

async function getAllMovies(url) {
  try {
    let response = await fetch(url);
    let movieData = await response.json();
    return movieData;
  } catch (error) {
    console.log(error);
  }
}

app.get('/search/movies', (req, res) => {
  res.render('search');
});

// server-side search - returns object for mustache template
app.post('/search/movies', async (req, res) => {
  const searchTerm = req.body.search;
  const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${searchTerm}&page=1&type=%22movie%22`;
  const searchedMovies = await getAllMovies(url);
  res.render('search', {
    movies: searchedMovies.Search,
    pageNum: 1,
    searchTerm: searchTerm
  });
});

// async search - returns json
app.get('/search/movies/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${searchTerm}&page=1&type=%22movie%22`;
  const searchedMovies = await getAllMovies(url);
  res.json(searchedMovies);
});

app.listen(PORT, () => {
  console.log('Server is running...');
});
