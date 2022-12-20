var date = require('../models/date');

// Display list of all date.
exports.date_list = function(req, res) {
    res.send('NOT IMPLEMENTED: date list');
};

// Display detail page for a specific date.
exports.date_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: date detail: ' + req.params.id);
};

// Display date create form on GET.
exports.date_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: date create GET');
};

// Handle date create on POST.
exports.date_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: date create POST');
};

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