const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
// app.post()
// app.put()
// app.delete()
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/api', (req, res) => {
  res.send([1, 2, 3, 4, 5, 6, 8])
})
app.get('/api/:id', (req, res) => {
  //  res.send(req.params.id)
  res.send(req.query) //as?sortBy=10
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(port))
