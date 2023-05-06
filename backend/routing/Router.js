const Router = require('express')
const router = new Router()
const { addMoney,getMoney, deleteMoney } = require('../controllers/Controller');

router.get('/',(req,res) => {
    res.render("home");
});


router.post('/add-money',addMoney)
//.get('/get-money', getMoney)
//.delete('/delete-money/:id', deleteMoney)


module.exports = router