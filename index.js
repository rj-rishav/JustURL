const express = require('express')
const connectDB = require('./connection')

connectDB()
const app = express()

app.listen(process.env.PORT || 3001, () => {
    console.log(`\nServer started...`)
})