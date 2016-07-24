var keystone = require('keystone');
var User = keystone.list('users');
exports = module.exports = function(req, res) {
	
 	var view = new keystone.View(req, res);

	User.model.findOne({
		   _id: req.query.user_id,
	}) .exec(function(err, user) {
		user.valid = true;
		user.save(function(err) {
			if (err) {
				req.flash('error', 'There is issue in Activating your Account..');
				res.redirect('/');
			}else{
				req.flash('success', 'Your account has been activated.');
				view.render(__dirname + '/../../templates/views/signin');
			}
		});
	});
	
};
