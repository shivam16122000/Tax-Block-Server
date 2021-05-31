var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var mainController = require('../controllers/mainController');




router.get('/logout',mainController.logout);
router.get('/:id',mainController.user_data);

router.post('/signup',mainController.user_post);
router.post('/postloandata',mainController.form_post);
router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user : user
                });
            }
    
    req.login(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
    
    // generate a signed son web token with the contents of user object and return it in the response
    
    const token = jwt.sign(user.toJSON(), process.env.secretOrKey);
               return res.json({user, token});
            });
        })(req, res);
    });

module.exports = router;