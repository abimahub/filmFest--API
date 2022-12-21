var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DateSchema = new Schema(
  {
    date: {type: Date, required: true}
  }
);

// Virtual for date's URL
DateSchema
.virtual('url')
.get(function () {
  return '/catalog/date/' + this._id;
});

//Export model
module.exports = mongoose.model('date', DateSchema);