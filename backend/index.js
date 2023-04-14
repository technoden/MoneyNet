const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {readdirSync} = require('fs');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000

const app = express();


// routes
// readdirSync('./routing').map((route)=>app.use('/api/v1',require('./routing/' + route)))


let intialPath = path.join(__dirname, "views");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/register-user', async(req, res) => {
    const { name, email, password } = req.body;

    const candidate = await User.findOne({ email })
    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        const user = new User({
            name: name,
            email: email,
            password: password
        });

        user.save()
            .then(data => {
                res.json({ name: data.name, email: data.email });
            })
            .catch(err => {
                if(candidate){
                    res.json('email already exists');
                } else{
                    console.log(err);
                    res.json('error occurred');
                }
            });
    }
});

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    User.findOne({
        email: email,
        password: password
    })
    .then(data => {
        if(data){
            res.json({ password: data.password, email: data.email });
        } else{
            res.json('email or password is incorrect');
        }
    })
    .catch(err => {
        console.log(err);
        res.json('error occurred');
    });
});

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Liza:18092002@cluster0.xpg8n7v.mongodb.net/?retryWrites=true&w=majority`)
        //await mongoose.connect(`mongodb+srv://liza:18092002@cluster0.lkggfcn.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
