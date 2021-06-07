const express = require('express');
//const app = express()
const router = express.Router();
const request = require('request');
const morgan = require('morgan');
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const {
    IamAuthenticator
} = require('ibm-watson/auth');
var fs = require('fs');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});
router.use(morgan('combined', { stream: accessLogStream }));
router.use(morgan('tiny'));
//we are defining a new parameter called host
morgan.token('host', function (req, res) {
  return req.hostname;
});




const discovery = new DiscoveryV1({
    version: '2019-04-30',
    authenticator: new IamAuthenticator({
        apikey: '--KTG2kQCnkxynw-7P2vmC-BrgSHrIpK08WsY9Ud2QVr',
    }),
    serviceUrl: 'https://api.us-south.discovery.watson.cloud.ibm.com',
});


// const environmentId = '4e5276ab-e80b-41e7-b16c-91bb2d2693eb'
const environmentId = 'system'
//const collectionId = "a0e7632a-64a4-43d6-aaa6-236a6bce28a3"
const collectionId = 'news-en'




//Queries IBM Watson Discovery for species related news
router.get('/DiscoveryNews', (req, res) => {
    //query parameters
    let queryParams = {
        environmentId: environmentId,
        collectionId: collectionId,
        query: 'Quokka'
    };

    discovery.query(queryParams)
        .then(queryResponse => {
            console.log(JSON.stringify(queryResponse, null, 2));
            res.send(JSON.stringify(queryResponse, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
});




/**
 * I am not be able to access ibm cloud via localhost
 * but you can use ibm cloud url if you are not in china
 */
//const geoDataInfoUrl = 'http://localhost:3001/find/name?name='
const geoDataInfoUrl =
  'https://geodata-api.us-south.cf.appdomain.cloud/find/name?name=';

//Calls FaaS that returns all species info data
router.get('/allSpeciesInfoData', (req, res) => {
  //localhost 4000
  request(
    'https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllSpeciesInfo',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body) // Print the google web page.
        res.send(body);
      }
    }
  );
});

//Calls FaaS that returns all species info data
router.get('/findSpeciesInfoData', (req, res) => {
  //localhost 4000
  request(
    'https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/mongoGetOneSpeciesInfo',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body) // Print the google web page.
        res.send(body);
      }
    }
  );
});


/**
 * now is only for using common name
 * will support binomial later
 */

router.get('/mapData', (req, res) => {
  let name = encodeURI(req.query.name);
  let url = geoDataInfoUrl + name;
  request(url, function (error, result, body) {
    if (error != null) {
      res.send(error);
    } else {
      let jsonResult = JSON.parse(body);

      res.json(jsonResult);
    }
  });
});

router.get('/donatedPeople', (req, res) => {
  let name = encodeURI(req.query.name);
  let email = encodeURI(req.query.email);
  //localhost for now just testing
  request(
    'https://realtime-db-service.us-south.cf.appdomain.cloud/donate?name=' +
      name +
      '&email=' +
      email,
    function (error, result, body) {
      if (error != null) {
        res.send(error);
      } else {
        //log the result if send success
        console.log('success send to the back end');
        console.log('the name is : ' + name);
        console.log('the email is: ' + email);

        res.send(body);
      }
    }
  );
});

//Calls FaaS that returns all donators
router.get('/allDonators', (req, res) => {
  //localhost 4000
  request(
    'https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/donators',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body) // Print the google web page.
        res.send(body);
      }
    }
  );
});

//Calls FaaS that returns all charities
router.get('/allCharities', (req, res) => {
  //localhost 4000
  request(
    'https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllCharities',
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //send the charities data
        res.send(body);
      }
    }
  );
});

module.exports = router;
