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
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //lte (less than or equal to)
  //in
  //nin (not ini)
  const courses = await Course
    // .find({ author: 'Adi', isPublished: true })
    //.find({ price: { $gt: 10, $lte: 20 } }) //gt (greater than)
    .find({ price: { $in: [10, 15, 20] } }) //use or
    .limit(10)
    .sort({ name: -1 }) //1 to asc / -1 to desc
    .select({ name: 1, tags: 1 })
  console.log(courses)
}
getCourses()
