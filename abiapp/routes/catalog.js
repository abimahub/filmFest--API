var express = require('express');      //file lives in routes folder
var router = express.Router();

// Require controller modules.
var film_controller = require('../controllers/filmController');
var location_controller = require('../controllers/locationController');
var date_controller = require('../controllers/dateController');
var film_instance_controller = require('../controllers/filminstanceController');

/// film ROUTES ///

// GET catalog home page.
router.get('/', film_controller.index);

// GET request for creating a film. NOTE This must come before routes that display film (uses id).
router.get('/film/create', film_controller.film_create_get);

// POST request for creating film.
router.post('/film/create', film_controller.film_create_post);

// GET request to delete film.
router.get('/film/:id/delete', film_controller.film_delete_get);

// POST request to delete film.
router.post('/film/:id/delete', film_controller.film_delete_post);

// GET request to update film.
router.get('/film/:id/update', film_controller.film_update_get);

// POST request to update film.
router.post('/film/:id/update', film_controller.film_update_post);

// GET request for one film.
router.get('/film/:id', film_controller.film_detail);

// GET request for list of all film items.
router.get('/films', film_controller.film_list);

/// location ROUTES ///

// GET request for creating location. NOTE This must come before route for id (i.e. display location).
router.get('/location/create', location_controller.location_create_get);

// POST request for creating location.
router.post('/location/create', location_controller.location_create_post);

// GET request to delete location.
router.get('/location/:id/delete', location_controller.location_delete_get);

// POST request to delete location.
router.post('/location/:id/delete', location_controller.location_delete_post);

// GET request to update location.
router.get('/location/:id/update', location_controller.location_update_get);

// POST request to update location.
router.post('/location/:id/update', location_controller.location_update_post);

// GET request for one location.
router.get('/location/:id', location_controller.location_detail);

// GET request for list of all Authors.
router.get('/locations', location_controller.location_list);

/// date ROUTES ///

// GET request for creating a date. NOTE This must come before route that displays date (uses id).
router.get('/date/create', date_controller.date_create_get);

//POST request for creating date.
router.post('/date/create', date_controller.date_create_post);

// GET request to delete date.
router.get('/date/:id/delete', date_controller.date_delete_get);

// POST request to delete date.
router.post('/date/:id/delete', date_controller.date_delete_post);

// GET request to update date.
router.get('/date/:id/update', date_controller.date_update_get);

// POST request to update date.
router.post('/date/:id/update', date_controller.date_update_post);

// GET request for one date.
router.get('/date/:id', date_controller.date_detail);

// GET request for list of all date.
router.get('/dates', date_controller.date_list);

/// filminstance ROUTES ///

// GET request for creating a filminstance. NOTE This must come before route that displays filminstance (uses id).
router.get('/filminstance/create', film_instance_controller.filminstance_create_get);

// POST request for creating filminstance. 
router.post('/filminstance/create', film_instance_controller.filminstance_create_post);

// GET request to delete filminstance.
router.get('/filminstance/:id/delete', film_instance_controller.filminstance_delete_get);

// POST request to delete filminstance.
router.post('/filminstance/:id/delete', film_instance_controller.filminstance_delete_post);

// GET request to update filminstance.
router.get('/filminstance/:id/update', film_instance_controller.filminstance_update_get);

// POST request to update filminstance.
router.post('/filminstance/:id/update', film_instance_controller.filminstance_update_post);

// GET request for one filminstance.
router.get('/filminstance/:id', film_instance_controller.filminstance_detail);

// GET request for list of all filminstance.
router.get('/filminstances', film_instance_controller.filminstance_list);

module.exports = router;