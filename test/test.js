var expect = require("chai").expect
var request= require("request")

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


describe("test Quokka api endpoint", function (){
    var url = "https://species-map-service.us-south.cf.appdomain.cloud/quokka"
    it('Verifies data entry for Quokka', function (done) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body =JSON.parse(body)
                expect(body.name).to.equals("Quokka")
                done()
            }
        })
    });
})


describe("test WGK api endpoint", function (){
    let url = "https://species-map-service.us-south.cf.appdomain.cloud/wgk"
    it('Verifies data entry for Western Gray Kangaroo', function (done) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body =JSON.parse(body)
                expect(body.name).to.equals("Western Gray Kangaroo")
                done()
            }
        })
    });
})


//Will use cloud funtions in future sprints
describe("test FaaS template", function (){
    let url = "https://us-south.functions.appdomain.cloud/api/v1/web/brycewilkinson43%40gmail.com_dev/hello-world/helloworld.json"
    it('returns hello stranger', function (done) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body)
                expect(body.greeting).to.equals("Hello stranger!")
                done()
            }
        })
    });
})






//  FOR TESTING WATSON DISCOVERY News
/*
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const discovery = new DiscoveryV1({
    version: '{version}',
    authenticator: new IamAuthenticator({
        apikey: '{}',
    }),
    serviceUrl: '{https://api.us-south.discovery.watson.cloud.ibm.com/instances/20965335-5ee4-4058-b3c0-ef976fc70e09}',
    disableSslVerification: true,
});*/

/*
describe("test Watson Discovery Quokka Query", function (){
    let apiKey = "WqipI59T3pPZlTshaCoalrdNcrcp0k8vKuAaJcZSdOdp"
    let baseurl = "https://api.us-south.discovery.watson.cloud.ibm.com/instances/20965335-5ee4-4058-b3c0-ef976fc70e09"
   let queryurl = "https://api.us-south.discovery.watson.cloud.ibm.com/instances/20965335-5ee4-4058-b3c0-ef976fc70e09/v1/environments/system/collections/news-en/query?version=2018-12-03&filter=text%3A%22quokka%22&deduplicate=false&highlight=true&passages=true&passages.count=5&query=host%3A%3Aabc.net.au"

    it('Verifies data entry for Western Gray Kangaroo', function (done) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body =JSON.parse(body)
                expect(body.name).to.equals("Western Gray Kangaroo")
                done()
            }
        })
    });
})
 */