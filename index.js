const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const data = [
  { id: 1, nama: 'Adi Fatkhurozi' },
  { id: 2, nama: 'Haerani Lathifah' }
]
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/api', (req, res) => {
  res.send([1, 2, 3, 4, 5, 6, 8])
})
app.get('/api/:id', (req, res) => {
  const result = data.find(x => x.id === parseInt(req.params.id))
  if (!result) res.status(404).send('Data tidak ada')
  res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(port))
