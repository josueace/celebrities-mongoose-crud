const express = require("express");
const router  = express.Router();

const Movie = require("../models/movie");


router.get('/movies', (req, res, next) => {
  Movie.find()
  .then(allMovies =>{
  res.render('movies/index',{movies:allMovies});
console.log("hey");
  })
  .catch(err =>{
    next();
    return err;
  })
});


router.get('/movies/new', (req, res, next) => {
  res.render('movies/new');
});

router.get('/movies/:id',(req,res,next)=>{
  Movie.findOne({_id: req.params.id})
  .then((movie) => {
    res.render("movies/show", {movie});
  })
  .catch((error) => {
    next();
    return err;
  })
})


router.post('/movies', (req, res, next) => {
const {title,genre,plot} =req.body;
const newMovies = new Movie({title,genre,plot});
  newMovies.save()
  .then(movie =>{
   
    Movie.find()
    .then(allMovies =>{
    res.render('movies/index',{movies:allMovies});
  console.log("hey");
    })
    .catch(err =>{
      next();
      return err;
    })

  })
  .catch(err =>{
    res.redirect('movie/new');
  })
});



router.post('/movies/:id/delete', (req, res, next) => {
Movie.findByIdAndRemove(req.params.id)
.then(celeb =>{
  res.redirect('/movies')
})
.catch(err =>{
  next();
  return err;
})
  });


  router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
    .then(movie =>{
      res.render('movies/edit',{movie:movie})
    
    })
    .catch(err =>{
      next()
      return err;
    })
  });

  router.post('/movies/:id', (req, res, next) => {
   const {title,genre,plot} = req.body;
    Movie.update({_id:req.params.id},{ $set: {title, genre, plot}},)
    .then(movie =>{
      res.redirect('/movies');
    })
    .catch(err =>{
      next();
      return err;
    })
      });



module.exports = router;
