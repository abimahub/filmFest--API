var Date = require('../models/date');
var Film = require('../models/film');
var Location = require('../models/location');
var FilmInstance = require('../models/filminstance');

var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all dates.
exports.date_list = function(req, res) {
    Date.find()
      .sort([['date', 'ascending']])
      .exec(function (err, list_dates) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('date_list', { title: 'List of Dates', date_list: list_dates });
      });
  
};

// Display detail page for a specific date.
exports.date_detail = function(req, res, next) {
    async.parallel({
        date: function(callback) {
            Date.findById(req.params.id)
              .exec(callback);
        },

        date_films: function(callback) {
            Film.find({ 'date': req.params.id })
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.date==null) { // No results.
            var err = new Error('date not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('date_detail', { title: 'date Detail', date: results.date, date_films: results.date_films } );
    });
};

// Display date create form on GET.
exports.date_create_get = function(req, res, next) {     
    res.render('date_form', { title: 'Create Date' });
};

// Handle date create on POST.
exports.date_create_post = [
    // Validate that the name field is not empty.
    body('date', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
    
    // Sanitize (escape) the name field.
    sanitizeBody('date').toDate(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validator.validationResult(req);
  
      // Create a date object with escaped and trimmed data.
      var date = new Date(
        { date: req.body.date }
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('date_form', { title: 'Create date', date: date, errors: errors.array()});
        return;
      }
      else {
        // Data from form is valid.
        // Check if date with same name already exists.
        Date.findOne({ 'date': req.body.date })
          .exec( function(err, found_date) {
             if (err) { return next(err); }
  
             if (found_date) {
               // date exists, redirect to its detail page.
               res.redirect(found_date.url);
             }
             else {
  
               date.save(function (err) {
                 if (err) { return next(err); }
                 // date saved. Redirect to date detail page.
                 res.redirect(date.url);
               });
  
             }
  
           });
      }
    }
  ];
    


// Display date delete form on GET.
exports.date_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: date delete GET');
};

// Handle date delete on POST.
exports.date_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: date delete POST');
};

// Display date update form on GET.
exports.date_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: date update GET');
};

// Handle date update on POST.
exports.date_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: date update POST');
};