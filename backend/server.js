//Importing libraries
const { urlencoded } = require("express")
const express = require("express")
const app = express()

const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb+srv://Liza:18092002@cluster0.a6ak6gm.mongodb.net/?retryWrites=true&w=majority')

const start = async () => {
    try {
        await client.connect()
        console.log('Database connection ')

        await client.db().createCollection('users')
        const users=client.db().collection(name:'users')
    } catch (e) {
        console.log(e)
    }
}

start()


app.use(express, urlencoded({ extended: false }))

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users); // Display newly registered in the console
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

//Routes
app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})
//end Routes

app.listen(4000)
