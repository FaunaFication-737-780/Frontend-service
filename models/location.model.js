const { Schema, model } = require('mongoose')

const Location = model('Location', {
  name: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  SpeciesId: {
    type: Schema.Types.ObjectId,
    ref: 'Species',
  },
})

module.exports = Location
