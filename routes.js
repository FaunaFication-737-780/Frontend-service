const express = require("express")
//const app = express()
const router = express.Router()
const request = require('request');
const morgan = require('morgan');


router.use(morgan('tiny'));
//we are defining a new parameter called host
morgan.token('host', function(req, res) {
    return req.hostname;
});


//GeoData  for Species call
router.get('/quokkaData', (req, res) =>{
    //localhost 4000
    request('https://species-map-service.us-south.cf.appdomain.cloud/quokka', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            res.send(body)
        }
    })

})


//IBM discovery FaaS call
router.get('/quokkaNews', (req, res) =>{
    request("https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/hello-world/helloworld.json", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            res.send(body)
        }
    })

})





module.exports = router