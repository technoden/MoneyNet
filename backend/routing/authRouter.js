const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const{check}=require("express-validator")


router.get('/login', function(req, res) {
    res.render('login');
});
router.get('/registration', function(req, res) {
    res.render('register');
});

router.post('/registration',[
    check('username','username cannot be empty').notEmpty(),
    check('password','password must have 8 digits').isLength({min:8,max:20})] ,
    controller.registration)
    
router.post('/login', controller.login)



//router.get('/users', controller.getUsers)

module.exports = router
