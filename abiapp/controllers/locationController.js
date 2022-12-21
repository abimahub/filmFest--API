var location = require('../models/location');

// Display list of all Locations.
exports.location_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Location list');
};

// Display detail page for a specific location.
exports.location_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Location detail: ' + req.params.id);
};

// Display location create form on GET.
exports.location_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: location create GET');
};

// Handle location create on POST.
exports.location_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: location create POST');
};

// Display location delete form on GET.
exports.location_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: location delete GET');
};

// Handle location delete on POST.
exports.location_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: location delete POST');
};

// Display location update form on GET.
exports.location_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: location update GET');
};

// Handle location update on POST.
exports.location_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: location update POST');
};