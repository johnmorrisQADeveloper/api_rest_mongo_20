const express = require('express')
const cors = require('cors')

const app = express()
// routes
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

const videosRoute = require('./routes/todos')
app.use('/todos', videosRoute)

const db = 'mongodb+srv://john:john@cluster0-lom0m.mongodb.net/todos'
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to db')
})

const port = 3000
app.listen(port, () => 'server running')
