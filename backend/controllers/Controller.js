const MoneySchema = require('../models/Money')

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
        //res.status(200).json({message: 'Successfully Added'})
        res.redirect('/?success=Money%20added%20successfully');
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








