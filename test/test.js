var expect = require('chai').expect;
var request = require('request');

const geoDataInfoUrl =
  'https://geodata-api.us-south.cf.appdomain.cloud/find/name?name=';
//https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllSpeciesInfo
//https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/mongoGetOneSpeciesInfo
/*  EXAMPLE
describe("test api", function (){
    var url = "https://species-map-service.us-south.cf.appdomain.cloud/"
    it('returns status 200 to check if api works', function (done) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                expect(body).to.equals("Welcome")
                done()
            }
        })
    });
})
*/

//TODO
//test api endpoints based off of entries in SpeciesInfo to ensure none missing
describe('geodata api', function () {
  var url =
    'https://geodata-api.us-south.cf.appdomain.cloud/find/name?name=Quokka';
  it('returns status 200 to check if api works', function (done) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //expect(body).to.equals("Welcome")
        done();
      }
    });
  });
});

//TODO:
describe('SpeciesInfo FaaS', function () {
  var url =
    'https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/getAllSpeciesInfo';
  it('returns status 200 to check if api works', function (done) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //expect(body).to.equals("Welcome")
        done();
      }
    });
  });
});

//TODO:
//Iterate through all entries to ensure no missing data
//ensure validity of data for each
describe('Single species FaaS', function () {
  var url =
    'https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/default/mongoGetOneSpeciesInfo?name=Quokka';
  it('returns status 200 to check if api works', function (done) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //expect(body).to.equals("Welcome")
        done();
      }
    });
  });
});

//TODO:
//maybe create an endpoint on server to get logs of latest changes idk
describe('Test livedata endpoint', function () {
  var url = 'https://realtime-db-service.us-south.cf.appdomain.cloud/';
  it('returns status 200 to check if api works', function (done) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //expect(body).to.equals("SIT737&SIT780 Backend service")
        done();
      }
    });
  });
});
