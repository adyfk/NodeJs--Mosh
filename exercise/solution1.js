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
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Adi FC',
        isPublished: false
      }
    },
    { new: true }
  )
  console.log(result)
}
async function deleteCourse(id) {
  //const result = await Course.deleteOne({ _id: id })
  const course = await Course.findByIdAndRemove(id) //same
  console.log(result)
}
//but it has deprecated
//use updateOne or Many
//https://docs.mongodb.com/manual/reference/method/js-collection/
updateCourse('5a68fdf95db93f6477053ddd')
deleteCourse('5a68fdf95db93f6477053ddd')
//run()
