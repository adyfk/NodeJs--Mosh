const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())
const dotenv = require('dotenv')

dotenv.config()

const datas = [
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
  const result = datas.find(x => x.id === parseInt(req.params.id))
  if (!result) res.status(404).send('Data tidak ada')
  res.send(result)
})
app.post('/api', (req, res) => {
  const { error } = vaidateData(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }
  const data = {
    id: datas.length + 1,
    nama: req.body.nama
  }

  datas.push(data)
  res.send(datas)
})

app.put('/api/:id', (req, res) => {
  const data = datas.find(x => x.id === parseInt(req.params.id))
  if (!data) res.status(404).send('Data tidak ada')
  const { error } = vaidateData(req.body)
  if (error) {
    res.status(400).send(error.details[0].message)
    return
  }
  data.nama = req.body.nama
  res.send(datas)
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(port))

function vaidateData(data) {
  const schema = {
    nama: Joi.string()
      .min(3)
      .required()
  }
  return Joi.validate(data, schema)
}
