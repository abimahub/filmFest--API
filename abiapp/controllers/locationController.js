var Location = require('../models/location');
var Film = require('../models/film');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Display list of all Locations.
exports.location_list = function(req, res, next) {
    Location.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_locations) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('location_list', { title: 'Location List', location_list: list_locations });
      });
  
};

// Display detail page for a specific location.
exports.location_detail = function(req, res, next) {
    async.parallel({
        location: function(callback) {
            Location.findById(req.params.id)
              .exec(callback)
        },
        locations_films: function(callback) {
          Film.find({ 'location': req.params.id },'title blurb')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.location==null) { // No results.
            var err = new Error('Location not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('location_detail', { title: 'Location Detail', location: results.location, location_films: results.locations_films } );
    });
};

// Display location create form on GET.
exports.location_create_get = function(req, res, next) {
    res.render('location_form', { title: 'Create Location'});
};

// Handle location create on POST.
exports.location_create_post = [

    // Validate fields.
    body('name').isLength({ min: 1 }).trim().withMessage('Cinema name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('street1').isLength({ min: 1 }).trim().withMessage('Cinema name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('street2').isLength({ min: 1 }).trim().withMessage('Cinema name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('suburb').isLength({ min: 1 }).trim().withMessage('Cinema name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('state').isLength({ min: 1 }).trim().withMessage('Cinema name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('postcode').isLength({ min: 1 }).trim().withMessage('Cinema name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    body('latitude', 'Invalid coordinates').optional({ checkDMS: true }).isLatLong(),
    body('longitude', 'Invalid coordinates').optional({ checkDMS: true }).isLatLong(),

    // Sanitize fields.
    sanitizeBody('name').escape(),
    sanitizeBody('street1').escape(),
    sanitizeBody('street2').toDate(),
    sanitizeBody('suburb').toDate(),
    sanitizeBody('state').toDate(),
    sanitizeBody('postcode').toDate(),
    sanitizeBody('latitude').toDate(),
    sanitizeBody('longitude').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('location_form', { title: 'Create location', location: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an location object with escaped and trimmed data.
            var location = new location(
                {
                    name: req.body.name,
                    street1: req.body.street1,
                    street2: req.body.street2,
                    suburb: req.body.suburb,
                    state: req.body.state,
                    postcode: req.body.postcode,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,

                });
            location.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new location record.
                res.redirect(location.url);
            });
        }
    }
];

// Display location delete form on GET.
exports.location_delete_get = function(req, res, next) {

    async.parallel({
        location: function(callback) {
            Location.findById(req.params.id).exec(callback)
        },
        location_films: function(callback) {
          Film.find({ 'location': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.location==null) { // No results.
            res.redirect('/catalog/locations');
        }
        // Successful, so render.
        res.render('location_delete', { title: 'Delete Location', location: results.location, location_films: results.locations_films } );
    });
};

// Handle location delete on POST.
exports.location_delete_post = function(req, res, next) {

    async.parallel({
        location: function(callback) {
          Location.findById(req.body.locationid).exec(callback)
        },
        locations_films: function(callback) {
          Film.find({ 'location': req.body.locationid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.locations_films.length > 0) {
            // location has films. Render in same way as for GET route.
            res.render('location_delete', { title: 'Delete location', location: results.location, location_films: results.locations_films } );
            return;
        }
        else {
            // location has no films. Delete object and redirect to the list of locations.
            Location.findByIdAndRemove(req.body.locationid, function deleteLocation(err) {
                if (err) { return next(err); }
                // Success - go to location list
                res.redirect('/catalog/locations')
            })
        }
    });
};

// Display location update form on GET.
exports.location_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: location update GET');
};

// Handle location update on POST.
exports.location_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: location update POST');
};