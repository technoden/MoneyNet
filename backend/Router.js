const Router = require('express')
const router = new Router()
//const controller = require('./authController')

router.get('/',function(req,res){
    res.render('index');
});



module.exports = router