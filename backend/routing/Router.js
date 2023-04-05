const Router = require('express')
const router = new Router()
const { addExpense,getExpense, deleteExpense, deleteIncome, addIncome, getIncomes } = require('../controllers/Controller');

router.get('/',(req,res) => {
    res.render('index');
});


router.post('/add-income',addIncome)
    .get('/get-incomes', getIncomes)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-income/:id', deleteIncome)
    .delete('/delete-expense/:id', deleteExpense)


module.exports = router