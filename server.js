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


/* parse application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }))

/*  parse application/json */
app.use(express.json())

 /*  get routes */
const routes = require("./routes")
app.use(routes)


/* create expressSession */
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession); 

/* Passport setup */ 
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


/* add Passport for Moongoose */
const passportLocalMongoose = require('passport-local-mongoose');

/*const uri = "mongodb://ray:1998@cluster0-shard-00-00.ho33k.mongodb.net:27017,cluster0-shard-00-01.ho33k.mongodb.net:27017,cluster0-shard-00-02.ho33k.mongodb.net:27017/test?ssl=true&replicaSet=atlas-k8w5gq-shard-0&authSource=admin&retryWrites=true&w=majority"; */
 
mongoose.connect('mongodb+srv://admin:admin@cluster0.5cdt0.mongodb.net/geodata?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}); 
 
 /* mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}); */

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'))
db.once('open', function() {
    /* we're connected! */
    console.log("database connected")

});


/* Add userDetail Schema */
const Schema = mongoose.Schema;
const UserDetail = new Schema( {
   username: String,
   password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');


/* PASSPORT Local Authentication */

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());




/* Secure routing begins */
var connectEnsureLogin = require('connect-ensure-login');
  
  
  
/* user login - POST action  */

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
         return res.redirect('login.html?info=' + info);
      }

      req.login(user, function(err) {
         if (err) {
           console.log(err);
           return next(err);
    }
        return res.redirect('/secureindex');
  });

  }) (req, res, next);
});


 /* Upon successful login, route to the first secure page  */
 app.get('/secureindex', 
 connectEnsureLogin.ensureLoggedIn(), 
 (req, res) => res.sendFile('/views/secureindex.html', { root: __dirname})

); 

app.get('/logout',function(req, res){
req.logOut();
res.redirect('/index');
});





/* search for a user  */
app.get('/user',
connectEnsureLogin.ensureLoggedIn(),
(req, res) => res.send( { user: req.user })
);  


/* secure route ends */







/* load local VCAP configuration  and service credentials  */
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);



/* serve static file (index.html, images, css)  */
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 3000
httpServer.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});



/* Register some users */
UserDetails.register({username: 'admin', active: false}, 'admin');











