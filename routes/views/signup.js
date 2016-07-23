var keystone = require('keystone');
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
    var locals = res.locals;
    
    // Set locals
    locals.section = 'signup';
    locals.title = 'signup';

    view.render(__dirname + '/../../templates/views/signup');
};
