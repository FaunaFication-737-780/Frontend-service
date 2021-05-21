var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
const request = require('request');
const mongoose = require("mongoose")
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const socket = require('./sockets')
const adminRouter = require('./adminRouter')

socket.openSocket(io)





//get routes
const routes = require("./routes")
app.use(routes)

//get the admin portal
app.use('/admin', adminRouter)


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

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



//Admin Portal
require('dotenv').config()
require('express-async-errors')


const usersRouter = require('./users.router')
const locationRouter = require('./location.router')
const adminRouter = require('./admin.router')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/SpeciesDataBase'
const PORT = process.env.PORT || 4040


app.use(bodyParser.json())

app.use('/users', usersRouter)
app.use('/users/:userId/locations', locationRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res) => res.send('ADMIN has to login. Go to "/admin"'))

//const run = async () => {
 // await mongoose.connect(MONGO_URL, {
 //   useNewUrlParser: true
 // })
 // await app.listen(PORT, () => {
 //   console.log(`Example app listening on port ${PORT}!`)
//  })
//}

//run()






