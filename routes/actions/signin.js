//var utils = require('keystone-utils');
var keystone = require('keystone');
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);

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
                            req.flash('error',err);
                        } else {
                            console.log('signedin');
                            req.flash('success','Signed in  Successfully..!!!');    
                        }
                    });    
                });
            }else{
                req.flash('error','Please verify Your EmailID');
            }
        } else if (err) {
            req.flash('error','database error'+err);
        } else {
            req.flash('error','Invalid detail');
        }
        res.redirect('/');
    });
};