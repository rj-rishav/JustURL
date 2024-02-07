const express = require('express')
const { createUrl } = require('../controllers/urlController')

const app = express()

const router = express.Router()
app.use(express.urlencoded({extended: false}));

router
.post('/', createUrl)

module.exports = router