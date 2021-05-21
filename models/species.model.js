const { model } = require('mongoose')

const Species = model('Species', {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

module.exports = Species
