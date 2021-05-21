require('dotenv').config()
const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRouter = require('./routers/users.router')
const locationRouter = require('./routers/location.router')
const adminRouter = require('./routers/admin.router')

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://praffultej:08662516940..aA@usersdatabase.sziau.mongodb.net/UsersDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 4040

const app = express()

app.use(bodyParser.json())

app.use('/users', usersRouter)
app.use('/users/:userId/locations', locationRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res) => res.send('ADMIN has to login. Go to "/admin"'))

const run = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
  })
  await app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
  })
}

run()
