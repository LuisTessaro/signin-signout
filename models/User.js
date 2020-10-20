const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { isEmail } = require('validator')

const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Email inválido'],
    createIndexes: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  telephones: {
    type: Array,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  last_login: {
    type: Date,
    default: Date.now(),
  },
  last_edit: {
    type: Date,
    default: Date.now(),
  },
  token: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password'))
    return next()

  try {
    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hash(this.password, salt)

    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods = {
  validatePassword: async function validatePassword(data) {
    return bcrypt.compare(data, this.password)
  },
}

module.exports = mongoose.model('User', UserSchema)