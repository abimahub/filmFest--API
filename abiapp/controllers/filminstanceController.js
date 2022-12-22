var Filminstance = require('../models/filminstance');
var Film = require('../models/film');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const film = require('../models/film');

// Display list of all filmInstances.
exports.filminstance_list = function(req, res, next) {
    FilmInstance.find()
      .populate('film')
      .exec(function (err, list_filminstances) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('filminstance_list', { title: 'Film Screenings List', filminstance_list: list_filminstances });
      });
};

// Display detail page for a specific filminstance.
exports.filminstance_detail = function(req, res, next) {
    FilmInstance.findById(req.params.id)
    .populate('film')
    .exec(function (err, filminstance) {
      if (err) { return next(err); }
      if (filminstance==null) { // No results.
          var err = new Error('film copy not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('filminstance_detail', { title: 'Copy: '+filminstance.film.title, filminstance:  filminstance});
    })
};

// Display filminstance create form on GET.
exports.filminstance_create_get = function(req, res, next) {
    Film.find({},'title')
    .exec(function (err, films) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('filminstance_form', {title: 'Create FilmInstance', film_list: films});
    }); 
};

// Handle filminstance create on POST.
exports.filminstance_create_post = [

    // Validate fields.
    body('film', 'film must be specified').isLength({ min: 1 }).trim(),
    body('location', 'location must be specified').isLength({ min: 1 }).trim(),
    body('date', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
    
    // Sanitize fields.
    sanitizeBody('film').escape(),
    sanitizeBody('location').escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('date').toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a filmInstance object with escaped and trimmed data.
        var filminstance = new FilmInstance(
          { film: req.body.film,
            location: req.body.location,
            status: req.body.status,
            date: req.body.date
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Film.find({},'title')
                .exec(function (err, films) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('filminstance_form', { title: 'Create FilmInstance', film_list: films, selected_film: filminstance.film._id , errors: errors.array(), filminstance: filminstance });
            });
            return;
        }
        else {
            // Data from form is valid.
            filminstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(filminstance.url);
                });
        }
    }
];

// Display filminstance delete form on GET.
exports.filminstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: filminstance delete GET');
};

// Handle filminstance delete on POST.
exports.filminstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: filminstance delete POST');
};

// Display filminstance update form on GET.
exports.filminstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: filminstance update GET');
};

// Handle filminstance update on POST.
exports.filminstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: filminstance update POST');
};