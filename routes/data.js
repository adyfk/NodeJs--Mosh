const express = require('express')
const router = express.Router()
const Joi = require('joi')
const datas = [
  { id: 1, nama: 'Adi Fatkhurozi' },
  { id: 2, nama: 'Haerani Lathifah' }
]
router.get('/', (req, res) => {
  res.send(datas)
})
router.get('/:id', (req, res) => {
  const result = datas.find(x => x.id === parseInt(req.params.id))
  if (!result) return res.status(404).send('Data tidak ada')
  res.send(result)
})
router.post('/', (req, res) => {
  const { error } = vaidateData(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const data = {
    id: datas.length + 1,
    nama: req.body.nama
  }
  datas.push(data)
  res.send(datas)
})

router.put('/:id', (req, res) => {
  const data = datas.find(x => x.id === parseInt(req.params.id))
  if (!data) return res.status(404).send('Data tidak ada')
  const { error } = vaidateData(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  data.nama = req.body.nama
  res.send(datas)
})

router.delete('/:id', (req, res) => {
  const data = datas.find(x => x.id === parseInt(req.params.id))
  if (!data) return res.status(404).send('Data tidak ada')
  const index = datas.indexOf(data)
  datas.splice(index, 1)
  res.send(datas)
})

module.exports = router
function vaidateData(data) {
  const schema = {
    nama: Joi.string()
      .min(3)
      .required()
  }
  return Joi.validate(data, schema)
}
