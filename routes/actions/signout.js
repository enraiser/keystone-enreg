var keystone = require('keystone');

exports = module.exports = function (req, res) {
    var user = req.user;
    res.clearCookie('keystone.uid');
    req.user = null;
    req.session.regenerate(function (err) {
        if (err) return res.json({ error: 'session error', detail: err });
        keystone.callHook(user, 'post:signout', function (err) {
            if (err) return res.json({ error: 'post:signout error', detail: err });
            //req.flash('error','Logout Successfully..!!!');
            res.redirect('/');
        });
    });
  

};