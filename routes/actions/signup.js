
var keystone = require('keystone');
var User = keystone.list('users');
if (!process.env.SITE_EMAIL_ADDRESS) throw new Error("Expected SITE_EMAIL_ADDRESS missing one or both.");

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
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
            view.render(__dirname + '/../../templates/views/signup');
        } else {
            var Email = new keystone.Email('welcome');
            var siteurl = keystone.get('siteurl');
            var brand = keystone.get('brand');
            var options = {
                first_name: newUser.name.first,
                link: siteurl+"action/verify?user_id=" +newUser._id,
                subject: 'Please verify your email',
                to: newUser.email,
                from: {
                    name: brand,
                    email: process.env.SITE_EMAIL_ADDRESS
                }
            };
            if (process.env.SMTP_HOST) // to use keystone-enmailer for SMTP emails
                options.mandrill = require('keystone-enmailer').mandrill;

            Email.send(options);
            req.flash('info', 'Please verify your email');
            res.redirect('/');
        }
    });
};