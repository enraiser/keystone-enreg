
var keystone = require('keystone');
var User = keystone.list('users');
var enmailer = require('keystone-enmailer');
exports = module.exports = function(req, res) {

        var newUser = User.model({
    		name: {first: req.body.first,last: req.body.last},
    		email: req.body.email,
    		password: req.body.password,
    		isAdmin: false,
            valid: false
		});

        var updater = newUser.getUpdateHandler(req);
        updater.process(req.body, {
            	fields: 'email',//fields: 'email, password',
            	flashErrors: true,
            	logErrors: true
        	}, function(err,result) {
        		
            	if (err) {
                    console.log(err);
                    req.flash('warning', 'Signup issue');
                    res.redirect('/signup');
            	} else {
  
                    var Email = new keystone.Email('welcome');
                    var siteurl = keystone.get('siteurl');
                    var brand = keystone.get('brand');
                    Email.send({
                        mandrill: enmailer.mandrill,
                        first_name: newUser.name.first,
                        link: siteurl+"action/verify?user_id=" +newUser._id,
                        subject: 'Please verify your email',
                        to: newUser.email,
                        from: {
                            name: brand,
                            email: 'admin@lastwish.me'
                        }
                    });
                    console.log('email sent');
                    req.flash('info', 'Please verify your email');
                    res.redirect('/');

                }
        });
};