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

/* app.post('/register', async (req, res) => {

})
*/

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
