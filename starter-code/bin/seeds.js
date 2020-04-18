const mongoose = require('mongoose');
const Movie = require('../models/movie');

const dbtitle ="movieDB";
mongoose.connect(`mongodb://localhost/${dbtitle}`);
Movie.collection.drop();

const movies=[
  {
    title:"Shawshank Redemption",
    genre:"Independent Film",
    plot:"Prison guy escapes"
  },
  {
    title:"Spider-man",
    genre:"Sci-Fi",
    plot:"New York City spider person"
  },
  {
    title:"jack and the kukoo clock heart",
    genre:"Foreign short film",
    plot:"boy with a kuko clok heart"
  }
];


Movie.create(movies, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${movies.length} movies`)
  mongoose.connection.close();
});

