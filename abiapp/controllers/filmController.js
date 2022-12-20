var film = require('../models/film');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all films.
exports.film_list = function(req, res) {
    res.send('NOT IMPLEMENTED: film list');
};

// Display detail page for a specific film.
exports.film_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: film detail: ' + req.params.id);
};

// Display film create form on GET.
exports.film_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: film create GET');
};

// Handle film create on POST.
exports.film_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: film create POST');
};

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
    res.send('NOT IMPLEMENTED: film update GET');
};

// Handle film update on POST.
exports.film_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: film update POST');
};