var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LocationSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    street1: {type: String, required: true, max: 100},
	street2: {type: String, required: true, max: 100},
	suburb: {type: String, required: true, max: 100},
	state: {type: String, required: true, max: 100},
	postcode: {type: String, required: true, max: 100},
  latitude: {type: Number, max: 15},
    longitude: {type: Number, max: 16} 
  }      //above variables for use with cinemas.json seed file
);

// Virtual for location's full name
LocationSchema
.virtual('cinema')
.get(function () {
  return this.name + ', ' + this.suburb;
});

// Virtual for location's lifespan
LocationSchema
.virtual('co-ords')
.get(function () {
  return this.latitude - this.longitude;
});

// Virtual for location's URL
LocationSchema
.virtual('url')
.get(function () {
  return '/catalog/location/' + this._id;
});

//Export model
module.exports = mongoose.model('location', LocationSchema);