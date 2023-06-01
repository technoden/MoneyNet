const Router = require('express')
const router = new Router()
const { addMoney,getExpenses,getIncomes,deleteIncome,deleteExpense, editIncome, editExpense, getMoney} = require('../controllers/Controller');

router.get('/',(req,res) => {
    res.render("home");
});


router.post('/add-money',addMoney)
    .post('/login',login)
    .post('/registration',registration)
    .get('/get-expenses', getExpenses)
    .get('/get-incomes', getIncomes)
    .get('/get-money', getMoney)
    .delete('/delete-income/:id', deleteIncome)
    .delete('/delete-expense/:id', deleteExpense)
    //.put('edit-income/:id',editIncome)
    //.put('edit-expense/:id',editExpense)



module.exports = router
