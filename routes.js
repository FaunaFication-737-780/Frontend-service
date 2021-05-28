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
//router.use(morgan('combined', {stream: accessLogStream}));
//router.use(morgan('tiny'));
//we are defining a new parameter called host
morgan.token('host', function (req, res) {
  return req.hostname;
});

/**
 * I am not be able to access ibm cloud via localhost
 * but you can use ibm cloud url if you are not in china
 */
//const geoDataInfoUrl = 'http://localhost:3001/find/name?name='
const geoDataInfoUrl = 'https://geodata-api.us-south.cf.appdomain.cloud/find/name?name='





//Calls FaaS that returns all species info data
router.get('/allSpeciesInfoData', (req, res) => {
  //localhost 4000
  request('https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllSpeciesInfo', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body) // Print the google web page.
      res.send(body)
    }
  })

})

//Calls FaaS that returns all species info data
router.get('/findSpeciesInfoData', (req, res) => {
  //localhost 4000
  request('https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/mongoGetOneSpeciesInfo', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body) // Print the google web page.
      res.send(body)
    }
  })

})


//IBM discovery FaaS call
router.get('/DiscoveryNews', (req, res) => {
  request("https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/hello-world/helloworld.json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body) // Print the google web page.
      res.send(body)
    }
  })

})

/**
 * now is only for using common name
 * will support binomial later
 */




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

router.get('/donatedPeople', (req, res) => {
  let name = encodeURI(req.query.name)
  let email = encodeURI(req.query.email)
  //localhost for now just testing 
  request('https://realtime-db-service.us-south.cf.appdomain.cloud/donate?name='+name+"&email="+email, function (error, result, body) {
    if(error!=null){
      res.send(error)
    }else{
      //log the result if send success
      console.log('success send to the back end');
      console.log("the name is : " +name );
      console.log("the email is: "+ email);
      
      
      res.send(body)
    }

  })
})


//Calls FaaS that returns all donators
router.get('/allDonators', (req, res) => {
  //localhost 4000
  request('https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/donators', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body) // Print the google web page.
      res.send(body)
    }
  })

})



module.exports = router