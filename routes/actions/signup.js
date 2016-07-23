
var keystone = require('keystone');
var User = keystone.list('users');

exports = module.exports = function(req, res) {
	
 	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	console.log("==---="+JSON.stringify(req.body));

	console.log(req.body.first+" "+req.body.last);
	//This will work only if there is hidden variable called action

		console.log(req.body.email);
        var newUser = User.model({
    		name: {first: req.body.first,last: req.body.last},
    		email: req.body.email,
    		password: req.body.password,
    		isAdmin: false
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
                	keystone.session.signinWithUser(newUser, req, res, function () {
                        console.log("signinWithUser func");
                        
						keystone.callHook(newUser, 'post:signin', function (err) {
							if (err) {
                                console.log(err);
                                req.flash('warning', 'SignIn issue');
                                res.redirect('/signup');
                            } else {
                                console.log('signedin');
                                 req.flash('info', 'you are signed in');
                                res.redirect('/');
                            }
                        });    
					});
                }
        });

    
	
    //view.render('myorders'); 
};