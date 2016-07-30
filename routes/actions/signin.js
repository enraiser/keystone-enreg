//var utils = require('keystone-utils');
var keystone = require('keystone');
exports = module.exports = function(req, res) {

    if (!req.body.email || !req.body.password) {
        req.flash('error','email and password required');
        res.redirect('/signin');
        return;
    }
    var User = keystone.list(keystone.get('user model'));
    //var emailRegExp = new RegExp('^' + utils.escapeRegExp(req.body.email) + '$', 'i');
    User.model.findOne({ email: req.body.email }).exec(function (err, user) {
        if (user) {
            if(user.valid ||  user.canAccessKeystone){
                 keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, function(user) {
                    req.flash('success',"Successfully signed in!");
                    res.redirect('/'); 
                 }, function(err) {
                    console.log(err);
                    req.flash('error',err);
                    res.redirect('/signin');
                 });
            }else{
                req.flash('error','Please verify Your EmailID');
                res.redirect('/signin');
            }
        } else {
            if (err) {
                req.flash('error','database error'+err);
            } else {
                req.flash('error','Invalid detail');
            }
            res.redirect('/signin');
        }
    });

};