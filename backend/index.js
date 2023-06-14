const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const User = require('../backend/models/User')
const PORT = process.env.PORT || 5000

const app = express();

let intialPath = path.join(__dirname, "views");

app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(express.static(intialPath));
app.use('/', require('../backend/routing/Router'));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
});

app.get('/incomes', (req, res) => {
    res.sendFile(path.join(intialPath, "incomes.html"));
});

app.get('/expenses', (req, res) => {
    res.sendFile(path.join(intialPath, "expenses.html"));
});

app.get('/info', (req, res) => {
    res.sendFile(path.join(intialPath, "info.html"));
});
app.use((req, res, next) => {
    const { userId } = req.body; // Assuming the userId is sent in the request body

    if (userId) {
        req.userId = userId;
    }

    next();
});

app.post('/register-user', async(req, res) => {
    const { name, email, password } = req.body;

    const candidate = await User.findOne({ email });

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else if(candidate){
        res.json('email already exists');
    } else{
        const hashPassword = bcrypt.hashSync(password,7)
        const user = new User({
            name: name,
            email: email,
            password: hashPassword
        });

        user.save()
            .then(data => {
                res.json({ name: data.name, email: data.email });
            })
            .catch(err => {
                console.log(err);
                res.json('error occurred');
            });
    }
});

app.post('/login-user', async(req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });

        if(user && bcrypt.compareSync(password, user.password)){
            res.json({ name: user.name, email: user.email });
        } else{
            res.json('email or password is incorrect');
        }
        const userId=email;
        console.log(userId);
    } catch(err){
        console.log(err);
        res.json('error occurred');
    }
});

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://lizanorko:18092002@cluster0.pfmzppk.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
