//var utils = require('keystone-utils');
var keystone = require('keystone');
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);

    


    console.log(req.body.first+" "+req.body.last);
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ error: 'email and password required' });
    }
    var User = keystone.list(keystone.get('user model'));
    //var emailRegExp = new RegExp('^' + utils.escapeRegExp(req.body.email) + '$', 'i');
    User.model.findOne({ email: req.body.email }).exec(function (err, user) {
        if (user) {
                if(user.valid){
                    console.log('user is valid');
                    keystone.session.signinWithUser(user, req, res, function () {
                        console.log("signinWithUser func");
                        
                        keystone.callHook(user, 'post:signin', function (err) {
                            if (err) {
                                    console.log(err);
                            } else {
                                console.log('signedin');
                                var view = new keystone.View(req, res);
                                req.flash('success','Signed in  Successfully..!!!');
                                view.render('index');
                            }
                        });    
                    });
                }else{
                    req.flash('error','Please verify Your EmailID');
                    view.render('index');
                }
        } else if (err) {
            return res.status(500).json({ error: 'database error', detail: err });
        } else {
            return res.json({ error: 'invalid details' });
        }
    });
};