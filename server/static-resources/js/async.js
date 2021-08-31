const searchResults = document.getElementById('searchResults');
const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('search');

async function fetchMovieData(url) {
  try {
    let response = await fetch(url);
    let movieData = await response.json();
    let movieItems = movieData.Search.map((movie) => {
      return `<div id="movieDiv">
                <h4>${movie.Title} - ${movie.Year}</h4>
                <input type="hidden" name="imdbID", value="${movie.imdbID}"/>
                <img src="${movie.Poster}"/>
            </div>`;
    });
    searchResults.innerHTML = movieItems.join('');
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener('click', () => {
  const searchTerm = search.value;
  const serverUrl = `http://localhost:3000/search/movies/${searchTerm}`;

  fetchMovieData(serverUrl);
});
