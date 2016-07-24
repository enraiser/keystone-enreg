![enRaiser : ](https://www.enraiser.com/mod/enraiser/graphics/site_logo.png) Keystone-enreg
=====

SignUp,SignIn,SignOut and email Validation for KeystoneJs.

## Installation

1. Create keystone project using `yo keystone`, and do not choose email feature.
2. Install keystone-enreg

    ```
    npm install git+https://git@github.com/enraiser/keystone-enreg.git
    ```


## Usage

1. In keystone.js at keystone.init add email template

    ```javascript
    keystone.init({
         ……
        'emails': 'templates/emails',
        'siteurl': 'http://mysite.com/',
    }); 
    ```
2. make sure you have set SITE_EMAIL_ADDRESS in .env file.

    ```
     SITE_EMAIL_ADDRESS=admin@lastwish.me

    ```
3. In routes/index.js inside module.exports 

    ```javascript
    require('keystone-enreg').routes(app);
    ```
4. Add welcome.jade  at templates/emails

    ```html
    block body-contents
        h1 Hi #{first_name},
        p.text-larger We would like to verify your EmailID to enroll you on #{brand}.
        p.text-larger click&nbsp;
            a(href='#{link}') 
                strong this link
            |  &nbsp; to complete this verification.
    ```
5. In User model add a boolean field called valid

    ```javascript
      valid: { type: Boolean, initial: true},
    ```
6. In default.jade change SignIn and SignOut links  and add SignUp link

    ```html
    if user
        if user.canAccessKeystone
            li: a(href='/keystone') Open Keystone
        li: a(href='/action/signout') Sign Out
    else
        li: a(href='/signin') Sign In
        li: a(href='/signup') Sign Up
    ```

