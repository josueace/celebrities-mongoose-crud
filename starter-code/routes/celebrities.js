const express = require("express");
const router  = express.Router();

const Celebrity = require("../models/celebrity.js");


router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(allCelebrities =>{
  res.render('celebrities/index',{celebs:allCelebrities});
console.log("hey");
  })
  .catch(err =>{
    next();
    return err;
  })
});


router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.get('/celebrities/:id',(req,res,next)=>{
  Celebrity.findOne({_id: req.params.id})
  .then((celeb) => {
    res.render("celebrities/show", {celeb});
  })
  .catch((error) => {
    next();
    return err;
  })
})

router.post('/celebrities', (req, res, next) => {
const {name,occupation,catchPhrase} =req.body;
const newCelebrities = new Celebrity({name,occupation,catchPhrase});
  newCelebrities.save()
  .then(celeb =>{
   
    Celebrity.find()
    .then(allCelebrities =>{
    res.render('celebrities/index',{celebs:allCelebrities});
  console.log("hey");
    })
    .catch(err =>{
      next();
      return err;
    })

  })
  .catch(err =>{
    res.redirect('celebrities/new');
  })
});

router.post('/celebrities/:id/delete', (req, res, next) => {
Celebrity.findByIdAndRemove(req.params.id)
.then(celeb =>{
  res.redirect('/celebrities')
})
.catch(err =>{
  next();
  return err;
})
  });


  router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
    .then(celeb =>{
      res.render('celebrities/edit',{celeb:celeb})
    
    })
    .catch(err =>{
      next()
      return err;
    })
  });

  router.post('/celebrities/:id', (req, res, next) => {
   const {name,occupation,catchPhrase} = req.body;
    Celebrity.update({_id:req.params.id},{ $set: {name, occupation, catchPhrase}},)
    .then(celeb =>{
      res.redirect('/celebrities');
    })
    .catch(err =>{
      next();
      return err;
    })
      });



module.exports = router;
