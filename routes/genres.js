const express = require('express')
const router = express.Router()
const Joi = require('joi')
const genres = [
  { id: 1, nama: 'Action' },
  { id: 2, nama: 'Fantasi' },
  { id: 3, nama: 'Horror' }
]
router.get('/', (req, res) => {
  res.send(genres)
})
router.get('/:id', (req, res) => {
  const result = genres.find(x => x.id === parseInt(req.params.id))
  if (!result) return res.status(404).send('Data tidak ada')
  res.send(result)
})
router.post('/', (req, res) => {
  const { error } = vaidateData(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const data = {
    id: genres.length + 1,
    nama: req.body.nama
  }
  genres.push(data)
  res.send(genres)
})

router.put('/:id', (req, res) => {
  const data = genres.find(x => x.id === parseInt(req.params.id))
  if (!data) return res.status(404).send('Data tidak ada')
  const { error } = vaidateData(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  data.nama = req.body.nama
  res.send(genres)
})

router.delete('/:id', (req, res) => {
  const data = genres.find(x => x.id === parseInt(req.params.id))
  if (!data) return res.status(404).send('Data tidak ada')
  const index = genres.indexOf(data)
  genres.splice(index, 1)
  res.send(genres)
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
