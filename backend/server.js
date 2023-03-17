//Importing libraries
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { db } = require('./db/db');

require('dotenv').config();

const app = express();

app.use(express.json());



const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        
        const savedUser = await newUser.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login 
app.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }


        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Routes
app.get('/', (req, res) => {
    res.send("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})
//end Routes

app.listen(4000)
