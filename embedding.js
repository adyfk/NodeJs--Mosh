const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
})

const Author = mongoose.model('Author', authorSchema)

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    // author: authorSchema
    author: {
      type: [authorSchema],
      required: true
    }
  })
)

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  })

  const result = await course.save()
  console.log(result)
}

async function listCourses() {
  const courses = await Course.find()
  console.log(courses)
}

async function updateAuthor(coureseId) {
  //const course = await Course.findById(coureseId)
  // course.author.name = 'Adi Fatkhurozi'
  // course.save()
  const course = await Course.update(
    { _id: coureseId },
    {
      $set: {
        'author.name': 'Haerani Lathifah'
      }
      // $unset: { //To Remove sub Document
      //   'author': ''
      // }
    }
  )
}
async function addAuthor(coureseId, author) {
  const course = await Course.findById(coureseId)
  course.author.push(author)
  course.save()
}
async function removeAuthor(coureseId, authorId) {
  const course = await Course.findById(coureseId)
  const author = course.author.id(authorId)
  author.remove()
  course.save()
}
//updateAuthor('5c45957ecb64552300da1967')
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Jhon' })
// ])
// addAuthor('5c45c75977668a3930d5cf87', new Author({ name: 'Adi' }))
removeAuthor('5c45c75977668a3930d5cf87', '5c45c75977668a3930d5cf85')
