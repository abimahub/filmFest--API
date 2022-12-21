var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FilmSchema = new Schema(
  {
    title: {type: String, required: true},
    blurb: {type: String, required: true},
    year: {type: String, required: true},
	imdbId:{type: Number, required: true},
	imdbRating:{type: Number, required: true},
	imdbVotes:{type: Number, required: true},
	poster: {type: String, required: true},
	imdbLink: {type: String, required: true}
	
  }
);

// Virtual for film's URL
FilmSchema
.virtual('url')
.get(function () {
  return '/catalog/film/' + this._id;
});

//Export model
module.exports = mongoose.model('film', FilmSchema);