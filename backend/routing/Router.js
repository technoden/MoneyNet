const Router = require('express')
const router = new Router()
const { addMoney,getExpenses,getIncomes} = require('../controllers/Controller');

router.get('/',(req,res) => {
    res.render("home");
});


router.post('/add-money',addMoney)
    .get('/get-expenses', getExpenses)
    .get('/get-incomes', getIncomes)
//.delete('/delete-money/:id', deleteMoney)


module.exports = router