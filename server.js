var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
const request = require('request');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);



//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});






//GeoData  for Species call
app.get('/quokkaData', (req, res) =>{
  //localhost 4000
  request('https://species-map-service.us-south.cf.appdomain.cloud/quokka', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
      res.send(body)
    }
  })

})


//IBM discovery FaaS call
app.get('/quokkaNews', (req, res) =>{
  request("https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/hello-world/helloworld.json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
      res.send(body)
    }
  })

})


