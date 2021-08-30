const searchResults = document.getElementById('searchResults');
const searchBtn = document.getElementById('searchBtn');
const search = document.getElementById('search');
const searchTerm = document.getElementById('searchTerm');

async function fetchMovieData(url) {
  try {
    let response = await fetch(url);
    let movieData = await response.json();
    let movieItems = movieData.Search.map((movie) => {
      return `<li>${movie.Title}</li>`;
    });
    searchResults.innerHTML = movieItems.join('');
  } catch (error) {
    console.log(error);
  }
}
