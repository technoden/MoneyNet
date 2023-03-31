const Router = require('express')
const router = new Router()
//const controller = require('../controllers/Controller')
const { addExpense,getExpense } = require('../controllers/Controller');
const { addIncome, getIncomes } = require('../controllers/Controller');

router.get('/',(req,res) => {
    res.render('index');
});

//const router = require('express').Router();

router.post('/add-income',addIncome)
    .get('/get-incomes', getIncomes)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
   





module.exports = router