const searchResults = document.getElementById('searchResults');
const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('search');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const accountBtn = document.getElementById('accountBtn');
const signoutBtn = document.getElementById('signoutBtn');

async function fetchMovieData(url) {
  try {
    let response = await fetch(url);
    let movieData = await response.json();
    let movieItems = movieData.Search.map((movie) => {
      return `<div id="movieDiv">
                <h4>${movie.Title}</h4>
                <img src="${movie.Poster}"/>
                <form method="GET" action="/movies/${movie.imdbID}">
                        <button>see movie details</button>
                    </form>
            </div>`;
    });
    searchResults.innerHTML = movieItems.join('');
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener('click', () => {
  const searchTerm = search.value;

  // local server url - uncomment when testing locally
  // const serverUrl = `http://localhost:3000/search/movies/${searchTerm}`;

  // heroku url - uncomment when deploying
  const serverUrl = `https://movie-scoop-01284.herokuapp.com/search/movies/${searchTerm}`;

  fetchMovieData(serverUrl);
});
