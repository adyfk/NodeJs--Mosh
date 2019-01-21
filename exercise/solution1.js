const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://localhost/mongo-exercises',
  { useNewUrlParser: true }
)

const courseSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25 //match:/patern
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'], //salahsatu
    lowercase: true, //Automatic to lower
    trim: true //stringonly
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0 //v !== null
          callback(result)
        }, 4000)
      },
      message: 'A Course Should have at least on tag'
    }
  },
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished
    },
    min: 10,
    max: 60,
    get: v => Math.round(v), //call
    set: v => Math.round(v) //set
  }
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
    name: 'Angular Course',
    category: '-',
    author: 'Adi',
    isPublished: true,
    price: 60
  })
  try {
    // const result = await course.save()
    // console.log(result)
    //OR
    await course.validate()
  } catch (err) {
    for (field in err.errors) console.log(err.errors[field].message)
  }
}
createCourse()
