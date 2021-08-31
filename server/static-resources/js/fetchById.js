var fetch = require('node-fetch')

function fetchMovieById(movie_id, completion) {

    fetch(`http://www.omdbapi.com/?apikey=[apikey]&i=${movie_id}`)
    .then(response => {
        return response.json();
    }).then((result) => {
        console.log('result',result);
        completion(result)
    }).catch(err => {
        console.error(err);
    });
}


module.exports = fetchMovieById