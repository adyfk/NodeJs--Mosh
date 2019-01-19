const helmet = require('helmet')
const express = require('express')
const app = express()
const datas = require('./routes/data')
app.use(express.json())
app.use(helmet())

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/api', datas)

app.get('/', (req, res) => {
  res.render('index', { title: 'First Page', message: 'Hello' })
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(port))
