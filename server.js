var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
const request = require('request');
const mongoose = require("mongoose")
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const socket = require('./sockets')

socket.openSocket(io)


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//get routes
const routes = require("./routes")
app.use(routes)

const uri = "mongodb://ray:1998@cluster0-shard-00-00.ho33k.mongodb.net:27017,cluster0-shard-00-01.ho33k.mongodb.net:27017,cluster0-shard-00-02.ho33k.mongodb.net:27017/test?ssl=true&replicaSet=atlas-k8w5gq-shard-0&authSource=admin&retryWrites=true&w=majority";
//mongoose.connect('mongodb+srv://admin:admin@cluster0.5cdt0.mongodb.net/geodata', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', function() {
    // we're connected!
    console.log("database connected")

});



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
httpServer.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});









