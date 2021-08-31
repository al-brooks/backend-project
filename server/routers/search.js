const router = express.Router();

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

router.get('/movies', (req, res) => {
  res.render('search');
});

// server-side search - returns object for mustache template
router.post('/movies', async (req, res) => {
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
router.get('/movies/:searchTerm', async (req, res) => {
  const searchTerm = req.params.searchTerm;
  const url = `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${searchTerm}&page=1&type=%22movie%22`;
  const searchedMovies = await getAllMovies(url);
  res.json(searchedMovies);
});

module.exports = router;
