var mongoose = require('mongoose');

var Schema = mongoose.Schema;
       // filminstance is a particular screening of a particular film
var FilmInstanceSchema = new Schema(
  {
    film: { type: Schema.Types.ObjectId, ref: 'film', required: true }, //reference to the associated Film
    status: {type: String, required: true, enum: ['Available', 'Sold Out', 'Low Tickets', 'VIP Showing'], default: 'Available'},
    location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
    date: [{type: Schema.Types.ObjectId, ref: 'Date'}]
  }
);

// Virtual for FilmInstance's URL
FilmInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/FilmInstance/' + this._id;
});

//Export model
module.exports = mongoose.model('FilmInstance', FilmInstanceSchema);