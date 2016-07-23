keystone-enreg
=====

* Keystone Registration,Login and Email Verification*
## Installation

1. create keystone project using yo keystone, and do not choose email feature.
2. install keystone-enreg

    npm install git+https://git@github.com/enraiser/keystone-enreg.git
3. in keystone.js at keystone.init add email template

keystone.init({
         ……
        'siteurl': 'http://mysite.com/',

}); 
4. welcome.jade

5. in User model 
      valid: { type: Boolean, initial: true},