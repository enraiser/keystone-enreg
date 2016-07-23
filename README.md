![Keystone-enreg](https://www.enraiser.com/mod/enraiser/graphics/site_logo.png)
=====

Keystone Registration,Login and Email Verification

## Installation

1. create keystone project using yo keystone, and do not choose email feature.
2. install keystone-enreg

    npm install git+https://git@github.com/enraiser/keystone-enreg.git
3. in keystone.js at keystone.init add email template

```javascript
keystone.init({
         ……
        'emails': 'templates/emails',
        'siteurl': 'http://mysite.com/',

}); 
```

4. in routes/index.js inside module.exports 

```javascript
    require('keystone-enreg').routes(app);
```

5. add welcome.jade  at templates/emails

```html
extends /layouts/default

block body-contents
        h1 Hi #{first_name},
        p.text-larger We would like to verify your EmailID to enroll you on #{brand}:
                p.text-larger click
                        a(href='#{link}') 
                                strong this link
                        | to complete this verification
                .text-larger !{comments}
        p &nbsp;

```

6. in User model add a boolean field called valid

```javascript
      valid: { type: Boolean, initial: true},
```

7. in default.jade change signup and signin links  and add SignUp link

```html
    if user
        if user.canAccessKeystone
            li: a(href='/keystone') Open Keystone
        li: a(href='/action/signout') Sign Out
    else
        li: a(href='/signin') Sign In
        li: a(href='/signup') Sign Up
```

