const MoneySchema = require('../models/Money')
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

exports.registration = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Ошибка при регистрации", errors})
        }
        const {name,email, password} = req.body;
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: "Пользователь с таким именем уже существует"})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: "USER"})
        const user = new User({name,email, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'email or password is incorrect' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'error occurred' });
    }
};


exports.getUsers=async(req, res)=>{
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
};

exports.addMoney = async (req, res) => {
    const {title,type,date, amount, category,newCategory, description}  = req.body

    const money = MoneySchema({
        title,
        type,
        date,
        amount,
        category: newCategory || category,
        description,

    })
    try {
        if(!title || !category || !type ){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await money.save()
        if (type === 'income') {
            return res.redirect('/incomes.html?success=Money%20added%20successfully');
        } else if (type === 'expense') {
            return res.redirect('/expenses.html?success=Money%20added%20successfully');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }

    console.log(money)
}

exports.getMoney = async (req, res) => {
    try {
        const money = await MoneySchema.find().sort({ createdAt: -1 });
        res.status(200).json(money);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const money = await MoneySchema.find({ type: 'expense' }).sort({ createdAt: -1 });
        res.status(200).json(money);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const money = await MoneySchema.find({ type: 'income' }).sort({ createdAt: -1 });
        res.status(200).json(money);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
};


exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    MoneySchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    MoneySchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.editIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount,date, category, newCategory, description } = req.body;

    try {
        const money = await MoneySchema.findById(id);

        if (!money) {
            return res.status(404).json({ message: 'Money not found' });
        }

        money.title = title || money.title;
        money.date = title || money.date;
        money.amount = amount || money.amount;
        money.category = newCategory || category || money.category;
        money.description = description || money.description;

        await money.save();


        res.status(200).json({ message: 'Money updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.editExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount,date, category, newCategory, description } = req.body;

    try {
        const money = await MoneySchema.findById(id);

        if (!money) {
            return res.status(404).json({ message: 'Money not found' });
        }

        money.title = title || money.title;
        money.date = title || money.date;
        money.amount = amount || money.amount;
        money.category = newCategory || category || money.category;
        money.description = description || money.description;

        await money.save();

        res.status(200).json({ message: 'Money updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};








