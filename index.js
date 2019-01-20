const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb://localhost/playground',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('ERROR =>', err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)
const course = new Course({
  name: 'NodeJS',
  author: 'Adi',
  tags: ['Node', 'Backend'],
  isPublished: true
})
