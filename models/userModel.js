const { model } = require('mongoose')

const User = model('User', {
  name: String,
  email: String,
  password: String,
})

module.exports = User