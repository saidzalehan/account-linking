if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

app.set('view engine', 'ejs');

//connect to mongodb
mongoose.connect(process.env.MONGODB_URL, () => {
	console.log('connet to mongodb')
});

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(session({secret: process.env.SESSION_SECRET,
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function(req, res, next){
	console.log(req.account);
	next();
});

require('./routes.js')(app, passport);

app.listen (9000, () => {
    console.log('app listen to port 9000');
	console.log('open browser and type in url http://localhost:9000');
});




