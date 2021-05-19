const { Router } = require('express')
const paginate = require('../services/paginate.service')
const Location = require('../models/location.model')
const Species = require('../models/species.model')

const router = new Router()

const serializer = (location) => {
  return location.toObject({ versionKey: false })
}

router.get('/', async (req, res) => {
  const locations = await paginate(Location.find({
    userId: req.params.userId,
  }), req)
  res.send(locations.map(serializer))
})

router.get('/:locationId', async (req, res) => {
  const location = await Location.findOne({
    userId: req.params.userId,
    _id: req.params.locationId,
  })
  res.send(serializer(location))
})

router.post('/', async (req, res) => {
  const location = await new Location({
    userId: req.params.userId,
    ...req.body.location
  }).save()
  res.send(serializer(location))
})

module.exports = router
