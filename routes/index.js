/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.Footer);

// Import Route Controllers
var routes = {
    views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

    // Views
    app.get('/', routes.views.index);

    app.get('/about', routes.views.about);
    app.get('/courses', routes.views.courses);
    app.get('/syllabi', routes.views.syllabi);
    app.get('/syllabi/:syllabus_key', routes.views.syllabus);
    app.get('/lightning-talks', routes.views.lightning_talks);
    app.get('/lightning-talks/:talk_key', routes.views.lightning_talk);
    app.get('/irb-proj', routes.views.irb_proj);
    app.get('/get-involved', routes.views.getting_involved);
    app.get('/collaborations', routes.views.collaboration);
    app.get('/events', routes.views.events);
    app.get('/events/:event_key', routes.views.event);
    // app.get('/people/:person', routes.views.person);

    // DEPRECATED
    app.get('/irb_proj', routes.views.irb_proj);
    app.get('/getting_involved', routes.views.getting_involved);
    app.get('/lightning_talks', routes.views.lightning_talks);
    app.get('/lightning_talks/:talk_key', routes.views.lightning_talk);
    
    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
