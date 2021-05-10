const express = require("express")
//const app = express()
const router = express.Router()
const request = require('request');
const morgan = require('morgan');
var fs = require("fs");
var path = require("path");

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a"
});
router.use(morgan('combined', {stream: accessLogStream}));
router.use(morgan('tiny'));
//we are defining a new parameter called host
morgan.token('host', function(req, res) {
    return req.hostname;
});
const geoDataInfoUrl = 'http://localhost:3001/find/name?name='

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

router.get('/mapData', (req, res) => {
    let name = encodeURI(req.query.name)
    let url = geoDataInfoUrl + name
    request(url, function (error, result, body) {
      if (error != null) {
        res.send(error)
      } else {
        let jsonResult = JSON.parse(body)
        
        res.json(jsonResult)
      }
  
    })
  
  })



module.exports = router