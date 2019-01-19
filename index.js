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
  //Vaidation WIthout JOI
  //   if (!req.body.nama || req.body.nama.length < 3) {
  //     //400 Bad request
  //     res.status(400).send('Name Is Required')
  //     return
  //   }
  const schema = {
    nama: Joi.string()
      .min(3)
      .required()
  }
  const result = Joi.validate(req.body, schema)
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }
  const data = {
    id: datas.length + 1,
    nama: req.body.nama
  }

  datas.push(data)
  res.send(datas)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(port))
