const mongoose = require("mongoose")

let Schema = mongoose.Schema
let SpeciesSchema = new Schema({
    name: String, population: Number, geoData: Array, about:String
})

const SpeciesModel = mongoose.model('species', SpeciesSchema);

//generic error handler
function handleError(err) {
    console.log(err)
}

module.exports = SpeciesModel