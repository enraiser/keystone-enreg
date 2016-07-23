var keystone = require('keystone');
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
    var locals = res.locals;
    
    // Set locals
    locals.section = 'signin';
    locals.title = 'signin';

    view.render(__dirname + '/../../templates/views/signin');
};
