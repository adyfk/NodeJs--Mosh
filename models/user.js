const Joi = require('joi')
const mongoose = require('mongoose')
const PasswordComplexity = require('joi-password-complexity')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 19,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
})
userSchema.methods.generateAuthToken = () => {
  return jwt.sign({ _id: this.id }, config.get('jwtPrivateKey'))
}
const User = mongoose.model('User', userSchema)
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(50)
      .required(),
    email: Joi.string()
      .min(20)
      .max(255)
      .required()
      .email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  }
  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
