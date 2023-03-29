const Router = require('express')
const router = new Router()
const controller = require('../controllers/Controller')

router.get('/',(req,res) => {
    res.render('index');
});




module.exports = router