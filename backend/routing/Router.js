const Router = require('express')
const router = new Router()
const { addMoney,getExpenses,getIncomes,deleteIncome,deleteExpense} = require('../controllers/Controller');

router.get('/',(req,res) => {
    res.render("home");
});


router.post('/add-money',addMoney)
    .get('/get-expenses', getExpenses)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .delete('/delete-expense/:id', deleteExpense)


module.exports = router