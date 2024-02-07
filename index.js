const express = require('express')
const connectDB = require('./connection')
const router = require('./routes/urlRoute')

connectDB()
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/urls', router)

app.listen(process.env.PORT || 3001, () => {
    console.log(`\nServer started...`)
})