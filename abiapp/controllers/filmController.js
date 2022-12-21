var film = require('../models/film');
var location = require('../models/location');
var date = require('../models/date');
var FilmInstance = require('../models/filminstance');

var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res) {
    async.parallel({
        film_count: function(callback) {
            Film.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        film_instance_count: function(callback) {
            FilmInstance.countDocuments({}, callback);
        },
        film_instance_available_count: function(callback) {
            FilmInstance.countDocuments({status:'Available'}, callback);
        },
        location_count: function(callback) {
            Location.countDocuments({}, callback);
        },
        date_count: function(callback) {
            Date.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.send(results);
       // 
    });
};

// Display list of all films.
exports.film_list = function(req, res) {
    Film.find({}, 'title location')
      .populate('location')
      .exec(function (err, list_films) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('film_list', { title: 'Film List', film_list: list_films });
      });
};

// Display detail page for a specific film.
exports.film_detail = function(req, res) {
    async.parallel({
        film: function(callback) {

            Film.findById(req.params.id)
              .populate('location')
              .populate('date')
              .exec(callback);
        },
        film_instance: function(callback) {

          FilmInstance.find({ 'film': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.film==null) { // No results.
            var err = new Error('film not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('film_detail', { title: results.film.title, film: results.film, film_instances: results.film_instance } );
    });
};

// Display film create form on GET.
exports.film_create_get = function(req, res) {
    async.parallel({
        locations: function(callback) {
            Location.find(callback);
        },
        dates: function(callback) {
            Date.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('film_form', { title: 'Create Film', locations: results.locations, dates: results.dates });
    });
};

// Handle film create on POST.
exports.film_create_post = [
     // Convert the date to an array.
     (req, res, next) => {
        if(!(req.body.date instanceof Array)){
            if(typeof req.body.date==='undefined')
            req.body.date=[];
            else
            req.body.date=new Array(req.body.date);
        }
        next();
    },

    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('location', 'location must not be empty.').isLength({ min: 1 }).trim(),
    body('blurb', 'blurb must not be empty.').isLength({ min: 1 }).trim(),
    body('imdbId', 'imdbId must not be empty').isLength({ min: 1 }).trim(),
  
    // Sanitize fields (using wildcard).
    sanitizeBody('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a film object with escaped and trimmed data.
        var film = new film(
          { title: req.body.title,
            location: req.body.location,
            blurb: req.body.blurb,
            imdbId: req.body.imdbId,
            date: req.body.date
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all locations and dates for form.
            async.parallel({
                locations: function(callback) {
                    Location.find(callback);
                },
                dates: function(callback) {
                    Date.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected dates as checked.
                for (let i = 0; i < results.dates.length; i++) {
                    if (film.date.indexOf(results.dates[i]._id) > -1) {
                        results.dates[i].checked='true';
                    }
                }
                res.render('film_form', { title: 'Create Film',locations:results.locations, dates:results.dates, film: film, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save film.
            film.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new film record.
                   res.redirect(film.url);
                });
        }
    }
];

// Display film delete form on GET.
exports.film_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: film delete GET');
};

// Handle film delete on POST.
exports.film_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: film delete POST');
};

// Display film update form on GET.
exports.film_update_get = function(req, res) {
    async.parallel({
        film: function(callback) {
            Film.findById(req.params.id).populate('location').populate('date').exec(callback);
        },
        locations: function(callback) {
            Location.find(callback);
        },
        dates: function(callback) {
            Date.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.film==null) { // No results.
                var err = new Error('Film not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            for (var all_g_iter = 0; all_g_iter < results.dates.length; all_g_iter++) {
                for (var film_g_iter = 0; film_g_iter < results.film.date.length; film_g_iter++) {
                    if (results.dates[all_g_iter]._id.toString()==results.film.date[film_g_iter]._id.toString()) {
                        results.dates[all_g_iter].checked='true';
                    }
                }
            }
            res.render('film_form', { title: 'Update Film', locations: results.locations, dates: results.dates, film: results.film });
        });
};

// Handle film update on POST.
exports.film_update_post = [
    (req, res, next) => {
        if(!(req.body.date instanceof Array)){
            if(typeof req.body.date==='undefined')
            req.body.date=[];
            else
            req.body.date=new Array(req.body.date);
        }
        next();
    },
   
    // Validate fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('location', 'location must not be empty.').isLength({ min: 1 }).trim(),
    body('blurb', 'blurb must not be empty.').isLength({ min: 1 }).trim(),
    body('imdbId', 'imdbId must not be empty').isLength({ min: 1 }).trim(),

    // Sanitize fields.
    sanitizeBody('title').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('blurb').escape(),
    sanitizeBody('imdbId').escape(),
    sanitizeBody('date.*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a film object with escaped/trimmed data and old id.
        var film = new film(
          { title: req.body.title,
            location: req.body.location,
            blurb: req.body.blurb,
            imdbId: req.body.imdbId,
            date: (typeof req.body.date==='undefined') ? [] : req.body.date,
            _id:req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all locations and dates for form.
            async.parallel({
                locations: function(callback) {
                    Location.find(callback);
                },
                dates: function(callback) {
                    Date.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected dates as checked.
                for (let i = 0; i < results.dates.length; i++) {
                    if (film.date.indexOf(results.dates[i]._id) > -1) {
                        results.dates[i].checked='true';
                    }
                }
                res.render('film_form', { title: 'Update Film',locations: results.locations, dates: results.dates, film: film, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Film.findByIdAndUpdate(req.params.id, film, {}, function (err,thefilm) {
                if (err) { return next(err); }
                   // Successful - redirect to film detail page.
                   res.redirect(thefilm.url);
                });
        }
    }
];