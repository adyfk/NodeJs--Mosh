const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost/mongo-exercises',
  { useNewUrlParser: true }
)

const courseSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
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
async function createCourse() {
  const course = new Course({
    author: 'Adi',
    tags: ['Node', 'Backend'],
    isPublished: true
  })
  try {
    // const result = await course.save()
    // console.log(result)
    //OR
    await course.validate()
  } catch (err) {
    console.log(err.message)
  }
}
createCourse()
