const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost/mongo-exercises',
  { useNewUrlParser: true }
)

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
  return await Course.find({
    isPublished: true
    // tags: { $in: ['backend', 'fontend'] }
  })
    .or({ price: { $gte: 15 } }, { name: /^A/i })
    .sort('-price') //desc or price:-1
    .select('name author price')
}

async function run() {
  const courses = await getCourses()
  console.log(courses)
}

async function updateCourse(id) {
  const course = await Course.findById(id)
  if (!course) return
  console.log('after cari')
  course.isPublished = true
  course.author = 'Another Author'
  course.name = 'CURSUSNANAA'
  // // course.set({
  // //   isPublished: true,
  // //   author: 'Another Author'
  // // })
  const result = await course.save()
  console.log(result)
}
updateCourse('5a68fdf95db93f64asd77053ddd')
//run()
