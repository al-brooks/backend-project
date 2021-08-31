const express = require('express')
const router = express.Router();
const fetchMovieById = require('../static-resources/js/fetchById')




    
router.get('/:movie_id',(req,res)=>{
    const movie_id = req.params.movie_id
    // const user_id = req.session.user_id
    fetchMovieById(movie_id, function(movie) {
        //look for movies in database where movie is equal to movie id
        //send as an object
        //remember where we displayed alltrips for each user.
       res.render('moviedetails', movie) 
    })
})

router.post('/add-review', (req,res)=>{
    // const user_id = req.session.user_id
    const movie_id = req.body.movie_id
    const review =  req.body.review
    //add review to the database
    //redirect page back to the movie id
    console.log(movie_id,review)

})
module.exports = router