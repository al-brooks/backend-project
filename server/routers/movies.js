const express = require('express');
const { dbConnection } = require('../../../../week_7/day4/routes/trips');
const router = express.Router();
const fetchMovieById = require('../static-resources/js/fetchById')




    
router.get('/:movie_id',(req,res)=>{
    const movie_id = req.params.movie_id
    fetchMovieById(movie_id, function(movie) {
        db.any('SELECT user_id, body, date_created FROM reviews WHERE movie_id = $1', [movie_id])
        .then(reviews => {
            res.render('moviedetails', {movie: movie, allReviews:reviews})  
        })      
    })
})

router.post('/add-review', (req,res)=>{
    const user_id = req.session.user_id
    const movie_id = req.body.movie_id
    const title = req.body.title
    const body =  req.body.review
    
    db.none('INSERT INTO reviews(title, body, user_id, movie_id)VALUES($1, $2, $3, $4)',[title, body, user_id, movie_id])
    .then(() => {
        res.redirect(`/movies/${movie_id}`)
    })

})
module.exports = router