const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routing/authRouter')
const Router = require('./routing/Router')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)
app.use("/",Router)
app.set('view engine', 'ejs');



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