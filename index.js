const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const helmet = require('helmet')
const express = require('express')
const app = express()
app.use(express.json())
app.use(helmet())

//to Show
//add env debug
//export DEBUG='app:startup'
//export DEBUG='app:*'
startupDebugger('Started')
dbDebugger('Connected to Database')

const port = process.env.PORT || 3000
app.listen(port, () => console.log(port))
