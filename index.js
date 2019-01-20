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
// async function createCourse() {
//   const course = new Course({
//     name: 'NodeJS',
//     author: 'Adi',
//     tags: ['Node', 'Backend'],
//     isPublished: true
//   })
//   const result = await course.save()
//   console.log(result)
// }

async function getCourses() {
  //or
  //and
  const courses = await Course
    //or
    .or([{ author: 'Adi' }, { isPublished: true }])
    .and([{ author: 'Adi' }, { isPublished: true }])
    .limit(10)
    .sort({ name: -1 }) //1 to asc / -1 to desc
    .select({ name: 1, tags: 1 })
  console.log(courses)
}
getCourses()
