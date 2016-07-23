
var keystone = require('keystone');

var init = function () {
	keystone.pre('routes', initLocals);
};


var routes = function (app) {

	var views = keystone.importer(__dirname+'/routes')('./views');
	var actions = keystone.importer(__dirname+'/routes')('./actions');

	app.get('/signup', views.signup);
	app.get('/signin', views.signin);


	app.post('/action/signup', actions.signup);
	app.get('/action/verify', actions.verify);
	app.post('/action/signin', actions.signin);
	app.get('/action/signout', actions.signout);
}


var initLocals = function(req, res, next) {	
	var locals = res.locals;

	next();
	
};

module.exports = {
    init: init,
    routes:routes,
};