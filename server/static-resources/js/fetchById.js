var fetch = require('node-fetch')
const apikey = "850935bc"

function fetchMovieById(movie_id, completion) {

    fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${movie_id}`)
    .then(response => {
        return response.json();
    }).then((result) => {
        completion(result)
    }).catch(err => {
        console.error(err);
    });
}


module.exports = fetchMovieById