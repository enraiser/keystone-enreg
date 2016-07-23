var keystone = require('keystone');
var User = keystone.list('users');
exports = module.exports = function(req, res) {
	
 	var view = new keystone.View(req, res);

		console.log('email link ---- /verify/?user_id='+req.query.user_id);

		
		User.model.findOne({
		   _id: req.query.user_id,
		}) .exec(function(err, user) {
			user.valid = true;
			//comment.save();
			user.save(function(err) {
			if (err) {
				req.flash('error', 'Your account has been activated.');
			}else{
				req.flash('success', 'Your account has been activated.');
			}
				
			});
		});


	
	view.render('index'); 
};
